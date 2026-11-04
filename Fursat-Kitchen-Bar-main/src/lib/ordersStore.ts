import { ALL_MENU_ITEMS, MenuItem } from "@/data/menuData";
import fs from "fs";
import path from "path";

export type OrderStatus = "NEW" | "ACCEPTED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  variant?: string;
  price?: number;
}

export interface CustomerOrder {
  id: string;
  tableNumber: string;
  customerName?: string;
  specialInstructions?: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// In-memory global store to maintain state across hot reloads
interface GlobalStore {
  orders: CustomerOrder[];
  unavailableItemIds: Set<string>;
  counter: number;
}

const globalForStore = globalThis as unknown as {
  fursatStore?: GlobalStore;
};

const DATA_FILE_PATH = path.join(process.cwd(), ".fursat_orders.json");

function loadInitialData(): GlobalStore {
  let orders: CustomerOrder[] = [];
  let unavailableItemIds = new Set<string>();
  let counter = 1000;

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf-8"));
      if (Array.isArray(data.orders)) orders = data.orders;
      if (Array.isArray(data.unavailableItemIds)) unavailableItemIds = new Set(data.unavailableItemIds);
      if (typeof data.counter === "number") counter = data.counter;
    }
  } catch (err) {
    console.error("Could not load persisted orders file:", err);
  }

  // Pre-populate with a demo order if empty for immediate kitchen dashboard demonstration
  if (orders.length === 0) {
    orders.push({
      id: "FRT-1024",
      tableNumber: "01",
      customerName: "Ananya",
      specialInstructions: "Less spicy in biryani, extra lemon for fresh lime soda",
      items: [
        { menuItemId: "bir-101", name: "Fursat Spl Chicken Pulao", quantity: 1, price: 445 },
        { menuItemId: "sb-2", name: "Chicken & cheese sandwich", quantity: 2, price: 445 },
        { menuItemId: "sd-5", name: "FRESH LIME SODA", quantity: 2, price: 129 },
      ],
      status: "NEW",
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    });
  }

  return { orders, unavailableItemIds, counter };
}

if (!globalForStore.fursatStore) {
  globalForStore.fursatStore = loadInitialData();
}

const store = globalForStore.fursatStore;

function persistData() {
  try {
    const payload = {
      orders: store.orders,
      unavailableItemIds: Array.from(store.unavailableItemIds),
      counter: store.counter,
    };
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(payload, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not persist orders to file:", err);
  }
}

export function getAllOrders(): CustomerOrder[] {
  return [...store.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): CustomerOrder | undefined {
  return store.orders.find((o) => o.id === id);
}

export interface CreateOrderInput {
  tableNumber: string;
  customerName?: string;
  specialInstructions?: string;
  items: {
    menuItemId: string;
    quantity: number;
    variant?: string;
  }[];
}

export function createOrder(input: CreateOrderInput): { order?: CustomerOrder; error?: string } {
  const tableNumber = input.tableNumber?.trim();
  if (!tableNumber) {
    return { error: "Table number is required." };
  }

  if (!input.items || !Array.isArray(input.items) || input.items.length === 0) {
    return { error: "At least one valid menu item is required." };
  }

  // Validate items against real menu data
  const validatedItems: OrderItem[] = [];

  for (const itemInput of input.items) {
    const menuItem = ALL_MENU_ITEMS.find((m) => m.id === itemInput.menuItemId);
    if (!menuItem) {
      return { error: `Invalid menu item: ID '${itemInput.menuItemId}' does not exist in the official menu.` };
    }

    if (store.unavailableItemIds.has(menuItem.id)) {
      return { error: `Item '${menuItem.name}' is currently unavailable in the kitchen.` };
    }

    const qty = Math.max(1, Math.min(50, Math.floor(itemInput.quantity || 1)));
    let itemPrice = menuItem.price;

    if (menuItem.variants && menuItem.variants.length > 0) {
      const selectedVariant = menuItem.variants.find((v) => v.id === itemInput.variant);
      if (selectedVariant) {
        itemPrice = selectedVariant.price;
      } else {
        itemPrice = menuItem.variants[0].price;
      }
    }

    validatedItems.push({
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity: qty,
      variant: itemInput.variant,
      price: itemPrice,
    });
  }

  store.counter += 1;
  const orderId = `FRT-${store.counter}`;

  const newOrder: CustomerOrder = {
    id: orderId,
    tableNumber,
    customerName: input.customerName?.trim() || undefined,
    specialInstructions: input.specialInstructions?.trim() || undefined,
    items: validatedItems,
    status: "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.orders.unshift(newOrder);
  persistData();

  return { order: newOrder };
}

export function updateOrderStatus(orderId: string, status: OrderStatus): CustomerOrder | null {
  const order = store.orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  persistData();

  return order;
}

export function getItemAvailabilityMap(): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const item of ALL_MENU_ITEMS) {
    map[item.id] = !store.unavailableItemIds.has(item.id);
  }
  return map;
}

export function toggleItemAvailability(itemId: string, available: boolean): boolean {
  const item = ALL_MENU_ITEMS.find((m) => m.id === itemId);
  if (!item) return false;

  if (available) {
    store.unavailableItemIds.delete(itemId);
  } else {
    store.unavailableItemIds.add(itemId);
  }

  persistData();
  return true;
}

// Kitchen Auth verification helpers
export const KITCHEN_CREDENTIALS = {
  username: process.env.KITCHEN_USERNAME || "fursat_kitchen",
  email: process.env.KITCHEN_EMAIL || "kitchen@fursat.com",
  password: process.env.KITCHEN_PASSWORD || "fursat123",
  sessionSecret: process.env.KITCHEN_SESSION_SECRET || "fursat_kitchen_luxury_session_token_2026",
};
