// File: app/api/auth/me/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { parseCookies } from "@/lib/cookieUtils";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    // 1) Connect to DB
    await dbConnect();
  } catch (error) {
    console.error("DB connection error in /api/auth/me:", error);
    return NextResponse.json(
      { isAuthenticated: false, error: "DB connection failed" },
      { status: 500 }
    );
  }

  // 2) Parse cookies from the request
  const cookieHeader = req.headers.get("cookie") || "";
  const allCookies = parseCookies(cookieHeader);

  // Extract the session token and role from cookies
  const sessionToken = allCookies.sessionToken || null;
  // Optionally, if you'd like to read or compare the role cookie:
  const roleCookie = allCookies.role || "";

  // If there's no session token, user is not authenticated
  if (!sessionToken) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    // 3) Validate token -> get userId
    const userId = await getUserIdByToken(sessionToken);
    if (!userId) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // 4) Fetch the user from DB to get their role and other fields
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // If you want to ensure the DB role matches the cookie role, you could do:
    // if (roleCookie && user.role !== roleCookie) {
    //   // Potential mismatch handling or just ignore
    // }

    // 5) Return isAuthenticated + the user object
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        _id: user._id.toString(), // convert ObjectId to string
        name: user.name,
        email: user.email,
        role: user.role, 
        // Add any other fields you want to expose
      },
    });
  } catch (error) {
    console.error("Session check error in /api/auth/me:", error);
    return NextResponse.json(
      { isAuthenticated: false, error: "Session check failed" },
      { status: 500 }
    );
  }
}
