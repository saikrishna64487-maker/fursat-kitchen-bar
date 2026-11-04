import { NextResponse } from "next/server";
import { getWebsiteContent } from "@/lib/contentStore";

export async function GET() {
  const content = getWebsiteContent();
  return NextResponse.json({
    success: true,
    data: content,
    content: content,
    timestamp: new Date().toISOString(),
  });
}
