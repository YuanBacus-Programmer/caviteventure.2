// app/api/auth/verify-code/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    // Add your verification logic here

    return NextResponse.json({ message: "Code verified successfully" });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error verifying code" }), { status: 500 });
  }
}
