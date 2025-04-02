import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    // Extract the 'eventId' from the request URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const eventId = segments[segments.length - 1]; // Assumes 'eventId' is the last segment

    const updated = await Event.findByIdAndUpdate(
      eventId,
      { status: "approved" },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event approved successfully" });
  } catch (err: any) {
    console.error("Error approving event:", err);
    return NextResponse.json(
      { error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
