import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createOrder, getAllOrders, KITCHEN_CREDENTIALS } from "@/lib/ordersStore";

async function isKitchenAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("fursat_kitchen_token")?.value;
  return token === KITCHEN_CREDENTIALS.sessionSecret;
}

export async function GET(request: Request) {
  // Check auth for kitchen access
  const isAuth = await isKitchenAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized kitchen access." }, { status: 401 });
  }

  const orders = getAllOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableNumber, customerName, specialInstructions, items } = body;

    const result = createOrder({
      tableNumber,
      customerName,
      specialInstructions,
      items,
    });

    if (result.error || !result.order) {
      return NextResponse.json({ error: result.error || "Failed to create order" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      order: result.order,
    }, { status: 201 });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json({ error: "Invalid order request." }, { status: 500 });
  }
}
