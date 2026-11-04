import { NextResponse } from "next/server";
import { verifyStaffAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const auth = await verifyStaffAuth();

    if (!auth.authenticated) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        username: auth.username || "staff",
        role: "STAFF",
      },
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
