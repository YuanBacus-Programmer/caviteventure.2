// app/api/auth/signin/route.ts
export const runtime = "nodejs"; // ensure Node runtime if you're using node's crypto
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { createSession } from "@/lib/auth"; // This calls createSessionInDB inside
import { serializeSessionCookie } from "@/lib/cookieUtils";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required." }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.hashedPassword || "");
    if (!match) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    // Create session doc in DB
    const token = await createSession(user._id.toString());
    // Make cookie
    const cookie = serializeSessionCookie(token);

    // Return success
    const res = NextResponse.json({ message: "Sign in successful." });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch (err) {
    console.error("Sign in error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
