// File: app/api/auth/me/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
  } catch (error) {
    console.error("DB connection error in /api/auth/me:", error);
    return NextResponse.json(
      { isAuthenticated: false, error: "DB connection failed" },
      { status: 500 }
    );
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/sessionToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  if (!token) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    const userId = await getUserIdByToken(token);
    return NextResponse.json({ isAuthenticated: !!userId });
  } catch (error) {
    console.error("Session check error in /api/auth/me:", error);
    return NextResponse.json(
      { isAuthenticated: false, error: "Session check failed" },
      { status: 500 }
    );
  }
}
