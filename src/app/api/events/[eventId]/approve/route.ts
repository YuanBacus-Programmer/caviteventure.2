import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import mongoose from "mongoose";

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    // Extract the 'eventId' from the request URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const eventId = segments[segments.length - 1]; // Assumes 'eventId' is the last segment

    // Validate 'eventId' as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    // Update the event status to 'approved'
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { status: "approved" },
      { new: true }
    ).lean();

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Event approved successfully",
      event: updatedEvent,
    });
  } catch (err: any) {
    console.error("Error approving event:", err);
    return NextResponse.json(
      { error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
