import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/vip") && role !== "VIP") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/teacher") && role !== "TEACHER") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vip/:path*", "/teacher/:path*", "/admin/:path*"],
};
