// src/lib/cookieUtils.ts
import { parse, serialize } from "cookie";

/**
 * Just parse cookies using 'cookie' library.
 * This file does NOT import sessionDb or Mongoose.
 */

/** 
 * parseCookies:
 *   The Edge runtime only needs to do a minimal check for the presence of a cookie.
 */
export function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};
  // If TS complains about undefined, cast as needed:
  return parse(cookieHeader) as Record<string, string>;
}

/**
 * serializeSessionCookie:
 *   Create a sessionToken cookie. 
 *   We can import from here in the Node environment if we want,
 *   or keep everything separate. This doesn't load Mongoose.
 */
export function serializeSessionCookie(token: string): string {
  return serialize("sessionToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, 
    sameSite: "strict",
  });
}
