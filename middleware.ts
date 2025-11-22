import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const ProtectedRoutes = ["/reservation", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isloggedIn = !!session?.user;
  const role = session?.user.role;
  const pathname = request.nextUrl.pathname;

  // Protect routes
  if (!isloggedIn && ProtectedRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Admin only
  if (isloggedIn && role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Already logged in cannot access signin
  if (isloggedIn && pathname.startsWith("/signin")) {
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
