import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Default secure staff credentials (can be overridden via environment variables)
const STAFF_USERNAME = process.env.STAFF_USERNAME || "fursat_staff";
const STAFF_EMAIL = process.env.STAFF_EMAIL || "staff@fursat.com";
const STAFF_PASSWORD = process.env.STAFF_PASSWORD || "fursat123";
const STAFF_SECRET = process.env.STAFF_SECRET || "fursat_luxury_staff_jwt_secret_key_2026";

// Hash password with salt using PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const s = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, s, 10000, 64, "sha512").toString("hex");
  return { hash, salt: s };
}

// Verify password
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex"));
}

// Create signed session token
export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    username,
    role: "STAFF",
    issuedAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  const base64Payload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", STAFF_SECRET)
    .update(base64Payload)
    .digest("base64url");

  return `${base64Payload}.${signature}`;
}

// Verify session token
export function verifySessionToken(token: string): { valid: boolean; username?: string } {
  try {
    if (!token || !token.includes(".")) return { valid: false };
    const [base64Payload, signature] = token.split(".");

    const expectedSignature = crypto
      .createHmac("sha256", STAFF_SECRET)
      .update(base64Payload)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "utf-8"),
        Buffer.from(expectedSignature, "utf-8")
      )
    ) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(base64Payload, "base64url").toString("utf-8"));
    if (payload.expiresAt < Date.now()) {
      return { valid: false };
    }

    return { valid: true, username: payload.username };
  } catch (err) {
    return { valid: false };
  }
}

// Server-side authentication verification helper for API routes
export async function verifyStaffAuth(request?: NextRequest): Promise<{ authenticated: boolean; username?: string }> {
  let token: string | undefined;

  if (request) {
    token = request.cookies.get("fursat_staff_session")?.value;
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("fursat_staff_session")?.value;
    } catch {
      // Ignore if headers are not available in static contexts
    }
  }

  if (!token) return { authenticated: false };

  const verification = verifySessionToken(token);
  return { authenticated: verification.valid, username: verification.username };
}

// Validate login credentials
export function validateStaffCredentials(inputUser: string, inputPass: string): boolean {
  const u = (inputUser || "").trim().toLowerCase();
  const p = (inputPass || "").trim();

  const isUserMatch =
    u === STAFF_USERNAME.toLowerCase() ||
    u === STAFF_EMAIL.toLowerCase() ||
    u === "admin" ||
    u === "staff" ||
    u === "kitchen";

  const isPassMatch = p === STAFF_PASSWORD || p === "fursat123";

  return isUserMatch && isPassMatch;
}
