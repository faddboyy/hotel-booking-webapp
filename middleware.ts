import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const ProtectedRoutes = ["/reservation", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isloggedIn = !!session?.user;
  const role = session?.user.role;
  const { pathname } = request.nextUrl;

  if (
    !isloggedIn &&
    ProtectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isloggedIn && role != "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isloggedIn && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|css|js)|api/auth).*)",
  ],
};
