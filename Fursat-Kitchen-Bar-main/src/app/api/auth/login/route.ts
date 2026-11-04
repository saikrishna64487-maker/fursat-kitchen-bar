import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateStaffCredentials, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const inputUser = (username || "").trim();
    const inputPass = (password || "").trim();

    if (!inputUser || !inputPass) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const isValid = validateStaffCredentials(inputUser, inputPass);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid staff credentials. Please check your username and password." },
        { status: 401 }
      );
    }

    // Generate secure HMAC session token
    const token = createSessionToken(inputUser);
    const cookieStore = await cookies();

    // Set staff session cookie (HTTP-only, Secure, SameSite=Lax, 7 days)
    cookieStore.set("fursat_staff_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Also set legacy kitchen token for kitchen orders dashboard compatibility
    cookieStore.set("fursat_kitchen_token", "fursat_kitchen_luxury_session_token_2026", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Staff authenticated successfully",
      user: {
        username: inputUser,
        role: "STAFF",
      },
    });
  } catch (err: any) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
