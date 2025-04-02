import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET(request: Request) {
  await dbConnect();

  // 1) Await cookies() so we get the actual cookie store, not a Promise
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value || null;

  // 2) If no sessionToken, user is not logged in
  if (!sessionToken) {
    return new NextResponse(
      JSON.stringify({ error: "No session token, not logged in" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 3) Convert sessionToken -> userId
  const userId = await getUserIdByToken(sessionToken);
  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid session token" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 4) Fetch the user from DB
  const user = await User.findById(userId).lean();
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 5) Check if role is superadmin
  if (user.role !== "superadmin") {
    return new NextResponse(JSON.stringify({ error: "Not authorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 6) If user is superadmin, return JSON
  return NextResponse.json({
    message:
      "SuperAdmin Dashboard data. Only accessible to users with the superadmin role.",
  });
}
