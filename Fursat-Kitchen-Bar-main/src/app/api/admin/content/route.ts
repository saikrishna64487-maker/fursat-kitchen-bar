import { NextResponse } from "next/server";
import { verifyStaffAuth } from "@/lib/auth";
import {
  getWebsiteContent,
  updateBanquetInfo,
  updateCateringInfo,
  updateEvents,
  updateRestaurantInfo,
} from "@/lib/contentStore";

export async function GET() {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const content = getWebsiteContent();
  return NextResponse.json({ success: true, data: content });
}

export async function PUT(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data payload" }, { status: 400 });
    }

    switch (type) {
      case "restaurantInfo":
        updateRestaurantInfo(data);
        break;
      case "banquet":
        updateBanquetInfo(data);
        break;
      case "catering":
        updateCateringInfo(data);
        break;
      case "events":
        updateEvents(data);
        break;
      default:
        return NextResponse.json({ error: `Unknown section type '${type}'` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${type} updated successfully`,
      updated: data,
    });
  } catch (err: any) {
    console.error("Admin content update error:", err);
    return NextResponse.json(
      { error: "Failed to update content." },
      { status: 500 }
    );
  }
}
