import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET(request: Request) {
  // 1) Connect to DB
  await dbConnect();

  // 2) Grab cookies, ensuring we await the promise
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value || null;

  // 3) Check if sessionToken exists
  if (!sessionToken) {
    return new NextResponse(
      JSON.stringify({ error: "No session token, not logged in" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 4) Convert sessionToken -> userId
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

  // 5) Fetch user from DB
  const user = await User.findById(userId).lean();
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 6) Check if role is superadmin
  if (user.role !== "superadmin") {
    return new NextResponse(JSON.stringify({ error: "Not authorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 7) If user is superadmin, return JSON
  return NextResponse.json({
    message:
      "Here, the superadmin can approve or reject events submitted by admins.",
  });
}
