import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;
  const isLoggedIn = !!token;
  const role = token?.role;

  const protectedRoutes = ["/reservation", "/checkout", "/admin"];

  // Not logged in → redirect
  if (!isLoggedIn && protectedRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Non-admin trying to access /admin
  if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Logged in but trying to open /signin
  if (isLoggedIn && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/reservation/:path*",
    "/checkout/:path*",
    "/admin/:path*",
    "/signin",
  ],
};
