import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "@/lib/cookieUtils"; 
// Only cookie parsing, no DB calls or Mongoose imports

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We define all protected routes
  const protectedRoutes = ["/homepage", "/eventpage", "/exihibitpage", "/profilepage"];

  // If the user tries to access any of these routes (or sub-routes),
  // check for the session token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = parseCookies(cookieHeader);
    const token = cookies["sessionToken"];

    if (!token) {
      // If no token => redirect to signin
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // If token is present, we let them proceed (DB check is done in your server page).
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
