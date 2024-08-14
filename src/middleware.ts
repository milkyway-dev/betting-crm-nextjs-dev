import { NextRequest, NextResponse } from "next/server";

export default function middleware(req:NextRequest) {
  const loggedin = req.cookies.get("token");
  const { pathname } = req.nextUrl;
  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  
  // For any other cases return
  return NextResponse.next();
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };