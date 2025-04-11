import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import mongoose from "mongoose";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    await dbConnect();

    // Await the params object to extract eventId
    const { eventId } = await params;

    // Validate the eventId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    // Update the event status to 'approved'
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
