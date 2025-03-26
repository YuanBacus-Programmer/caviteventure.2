// File: app/api/auth/me/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
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

  // 2) Read the sessionToken from cookies
  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/sessionToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  if (!token) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    // 3) Validate token -> get userId
    const userId = await getUserIdByToken(token);
    if (!userId) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // 4) Fetch the user from DB to get their role and other fields
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // 5) Return isAuthenticated + the user object
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        _id: user._id.toString(), // convert ObjectId to string
        name: user.name,
        email: user.email,
        role: user.role, 
        // add more fields if desired
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
