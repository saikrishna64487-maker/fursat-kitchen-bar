import { NextResponse } from "next/server";
import { MENU_CATEGORIES } from "@/data/menuData";
import { getMenuItems } from "@/lib/contentStore";
import { getItemAvailabilityMap, toggleItemAvailability } from "@/lib/ordersStore";

export async function GET() {
  const availability = getItemAvailabilityMap();
  const rawItems = getMenuItems();
  
  const items = rawItems.map((item) => ({
    ...item,
    available: availability[item.id] !== false,
  }));

  return NextResponse.json({
    categories: MENU_CATEGORIES,
    items,
    timestamp: new Date().toISOString(),
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { itemId, available } = body;

    if (!itemId || typeof available !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const ok = toggleItemAvailability(itemId, available);
    if (!ok) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, itemId, available });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
