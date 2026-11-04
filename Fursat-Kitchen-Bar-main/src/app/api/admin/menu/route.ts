import { NextResponse } from "next/server";
import { verifyStaffAuth } from "@/lib/auth";
import {
  getMenuItems,
  updateMenuItems,
  updateSingleMenuItem,
  deleteMenuItem,
} from "@/lib/contentStore";
import { getItemAvailabilityMap, toggleItemAvailability } from "@/lib/ordersStore";

export async function GET() {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const availability = getItemAvailabilityMap();
  const rawItems = getMenuItems();
  const items = rawItems.map((item) => ({
    ...item,
    available: availability[item.id] !== false,
  }));

  return NextResponse.json({ success: true, items });
}

// POST: Add new menu item
export async function POST(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, price, description, isVeg, subCategory, variants } = body;

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required." }, { status: 400 });
    }

    const newId = `item-${Date.now()}`;
    const newItem = {
      id: newId,
      name: name.trim(),
      category: category.trim(),
      subCategory: subCategory ? subCategory.trim() : undefined,
      price: typeof price === "number" ? price : parseFloat(price) || 0,
      description: description ? description.trim() : "",
      isVeg: Boolean(isVeg),
      variants: Array.isArray(variants) ? variants : undefined,
      available: true,
    };

    updateSingleMenuItem(newItem);

    return NextResponse.json({
      success: true,
      message: "Menu item created successfully",
      item: newItem,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create menu item." }, { status: 500 });
  }
}

// PUT: Edit existing menu item or batch update
export async function PUT(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (Array.isArray(body.items)) {
      updateMenuItems(body.items);
      return NextResponse.json({ success: true, message: "Menu updated successfully" });
    }

    const { id, name, category, price, description, isVeg, subCategory, variants, available } = body;

    if (!id || !name) {
      return NextResponse.json({ error: "ID and name are required." }, { status: 400 });
    }

    const updatedItem = {
      id,
      name: name.trim(),
      category: category ? category.trim() : "all-day-breakfast",
      subCategory: subCategory ? subCategory.trim() : undefined,
      price: typeof price === "number" ? price : parseFloat(price) || 0,
      description: description ? description.trim() : "",
      isVeg: Boolean(isVeg),
      variants: Array.isArray(variants) ? variants : undefined,
      available: available !== undefined ? Boolean(available) : true,
    };

    updateSingleMenuItem(updatedItem);

    if (available !== undefined) {
      toggleItemAvailability(id, Boolean(available));
    }

    return NextResponse.json({
      success: true,
      message: "Menu item updated successfully",
      item: updatedItem,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update menu item." }, { status: 500 });
  }
}

// DELETE: Delete menu item
export async function DELETE(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Menu item ID is required." }, { status: 400 });
    }

    const deleted = deleteMenuItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
