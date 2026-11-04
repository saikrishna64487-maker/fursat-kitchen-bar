import { NextResponse } from "next/server";
import { verifyStaffAuth } from "@/lib/auth";
import { getOffers, updateOffers, OfferItem } from "@/lib/contentStore";

export async function GET() {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const offers = getOffers();
  return NextResponse.json({ success: true, offers });
}

export async function POST(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, discountPct, label, start, end, description, active } = body;

    if (!name || discountPct === undefined) {
      return NextResponse.json({ error: "Name and discount percentage are required." }, { status: 400 });
    }

    const currentOffers = getOffers();
    const newOffer: OfferItem = {
      id: `off-${Date.now()}`,
      name: name.trim(),
      discountPct: parseInt(discountPct, 10) || 10,
      label: label ? label.trim() : "Special Offer",
      start: start || "12:00",
      end: end || "23:30",
      description: description ? description.trim() : "",
      active: active !== undefined ? Boolean(active) : true,
    };

    const updated = [...currentOffers, newOffer];
    updateOffers(updated);

    return NextResponse.json({ success: true, message: "Offer created successfully", offer: newOffer });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create offer." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const currentOffers = getOffers();

    if (Array.isArray(body.offers)) {
      updateOffers(body.offers);
      return NextResponse.json({ success: true, message: "Offers list updated successfully" });
    }

    const { id, name, discountPct, label, start, end, description, active } = body;
    if (!id) {
      return NextResponse.json({ error: "Offer ID is required." }, { status: 400 });
    }

    const updated = currentOffers.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          name: name !== undefined ? name.trim() : o.name,
          discountPct: discountPct !== undefined ? parseInt(discountPct, 10) : o.discountPct,
          label: label !== undefined ? label.trim() : o.label,
          start: start !== undefined ? start : o.start,
          end: end !== undefined ? end : o.end,
          description: description !== undefined ? description.trim() : o.description,
          active: active !== undefined ? Boolean(active) : o.active,
        };
      }
      return o;
    });

    updateOffers(updated);

    return NextResponse.json({ success: true, message: "Offer updated successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update offer." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Offer ID is required." }, { status: 400 });
    }

    const currentOffers = getOffers();
    const updated = currentOffers.filter((o) => o.id !== id);
    updateOffers(updated);

    return NextResponse.json({ success: true, message: "Offer deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete offer." }, { status: 500 });
  }
}
