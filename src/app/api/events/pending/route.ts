// File: app/api/events/pending/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const pendingEvents = await Event.find({ status: "pending" }).lean();
    return NextResponse.json({ events: pendingEvents });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
