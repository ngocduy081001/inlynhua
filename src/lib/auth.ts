/**
 * lib/auth.ts — JWT-based session auth for admin
 * Sử dụng jose (lightweight JWT, edge-compatible)
 */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 8; // 8 hours

// ─── Credentials (đổi trong .env.local cho production) ─────────────────────────
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "@Startup2026";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "inlygiaRe_secret_jwt_key_2026_change_in_production"
);

// ─── Verify credentials ─────────────────────────────────────────────────────────
export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// ─── Create session token ───────────────────────────────────────────────────────
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);
}

// ─── Verify session token ───────────────────────────────────────────────────────
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ─── Get session from cookies (server component/action) ─────────────────────────
export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_DURATION };
