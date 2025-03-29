// File: src/app/api/admin/users/[userId]/route.ts
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function PATCH(request: NextRequest, context: any) {
  try {
    await dbConnect();
    const { userId } = context.params;
    const { role } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.role = role;
    await user.save();

    return NextResponse.json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Error updating user role" }, { status: 500 });
  }
}
