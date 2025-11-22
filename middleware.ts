import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/reservation", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil token dari cookies (Auth.js v5)
  const token =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!token;

  // Decode JWT payload untuk baca role
  let role: string | null = null;
  if (token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64url").toString()
      );
      role = payload?.role || null;
    } catch (e) {
      role = null;
    }
  }

  // Guest tidak boleh masuk protected routes
  if (!isLoggedIn && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // User biasa tidak boleh masuk admin
  if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User logged-in tidak boleh buka /signin lagi
  if (isLoggedIn && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(png|jpg|jpeg|gif|svg|webp|css|js)|api/auth).*)",
  ],
};
