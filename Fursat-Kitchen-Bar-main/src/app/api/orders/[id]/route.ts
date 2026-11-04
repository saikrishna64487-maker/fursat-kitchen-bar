import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateOrderStatus, OrderStatus, KITCHEN_CREDENTIALS } from "@/lib/ordersStore";

async function isKitchenAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("fursat_kitchen_token")?.value;
  return token === KITCHEN_CREDENTIALS.sessionSecret;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isKitchenAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized kitchen access." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses: OrderStatus[] = ["NEW", "ACCEPTED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status: ${status}` }, { status: 400 });
    }

    const updated = updateOrderStatus(id, status as OrderStatus);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    console.error("Error updating order status:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
