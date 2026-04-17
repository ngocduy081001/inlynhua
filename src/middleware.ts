/**
 * middleware.ts — Bảo vệ route /admin bằng JWT cookie
 * Redirect về /admin/login nếu chưa đăng nhập
 */
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "inlygiaRe_secret_jwt_key_2026_change_in_production"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Chỉ bảo vệ /admin (không bảo vệ /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
