// File: app/api/auth/me/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/sessionToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  if (!token) {
    return NextResponse.json({ isAuthenticated: false });
  }
  const userId = await getUserIdByToken(token);
  return NextResponse.json({ isAuthenticated: !!userId });
}
