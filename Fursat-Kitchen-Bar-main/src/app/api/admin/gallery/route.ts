import { NextResponse } from "next/server";
import { verifyStaffAuth } from "@/lib/auth";
import { getAllGallery, updateGallery, GalleryPhoto } from "@/lib/contentStore";

export async function GET() {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const gallery = getAllGallery();
  return NextResponse.json({ success: true, gallery });
}

export async function POST(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { src, title, subtitle, category, order, active } = body;

    if (!src || !title) {
      return NextResponse.json({ error: "Image URL and title are required." }, { status: 400 });
    }

    const currentGallery = getAllGallery();
    const newPhoto: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      src: src.trim(),
      title: title.trim(),
      subtitle: subtitle ? subtitle.trim() : "",
      category: category ? category.trim() : "Atmosphere",
      order: typeof order === "number" ? order : currentGallery.length + 1,
      active: active !== undefined ? Boolean(active) : true,
    };

    const updated = [...currentGallery, newPhoto];
    updateGallery(updated);

    return NextResponse.json({ success: true, message: "Photo added to gallery", photo: newPhoto });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add photo." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await verifyStaffAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const currentGallery = getAllGallery();

    if (Array.isArray(body.gallery)) {
      updateGallery(body.gallery);
      return NextResponse.json({ success: true, message: "Gallery list updated successfully" });
    }

    const { id, src, title, subtitle, category, order, active } = body;
    if (!id) {
      return NextResponse.json({ error: "Photo ID is required." }, { status: 400 });
    }

    const updated = currentGallery.map((g) => {
      if (g.id === id) {
        return {
          ...g,
          src: src !== undefined ? src.trim() : g.src,
          title: title !== undefined ? title.trim() : g.title,
          subtitle: subtitle !== undefined ? subtitle.trim() : g.subtitle,
          category: category !== undefined ? category.trim() : g.category,
          order: typeof order === "number" ? order : g.order,
          active: active !== undefined ? Boolean(active) : g.active,
        };
      }
      return g;
    });

    updateGallery(updated);

    return NextResponse.json({ success: true, message: "Photo updated successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update photo." }, { status: 500 });
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
      return NextResponse.json({ error: "Photo ID is required." }, { status: 400 });
    }

    const currentGallery = getAllGallery();
    const updated = currentGallery.filter((g) => g.id !== id);
    updateGallery(updated);

    return NextResponse.json({ success: true, message: "Photo deleted from gallery" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete photo." }, { status: 500 });
  }
}
