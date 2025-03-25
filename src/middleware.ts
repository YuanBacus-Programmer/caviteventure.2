import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "@/lib/cookieUtils"; 
// Only cookie parsing, no DB calls or Mongoose imports

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Minimal example: check if user has any role cookie
  const roleCookie = request.cookies.get("role")?.value || "";

  // If user tries to visit /create-event or /admindashboard,
  // they must be "admin" or "superadmin".
  if (pathname.startsWith("/create-event") || pathname.startsWith("/admindashboard")) {
    if (!["admin", "superadmin"].includes(roleCookie)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // If user tries to visit /event-approval, must be superadmin
  if (pathname.startsWith("/event-approval")) {
    if (roleCookie !== "superadmin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

// Add route matching for the 4 private pages
export const config = {
  matcher: [
    "/homepage/:path*",
    "/eventpage/:path*",
    "/exihibitpage/:path*",
    "/profilepage/:path*",
  ],
};
