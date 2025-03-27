// File: app/eventpage/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import Event, { IEvent } from "@/models/Event";
import NextBlock from "@/components/nextblock/next-blocks"

export const runtime = "nodejs";

export default async function EventPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;
  if (!token) {
    redirect("/signin");
  }

  await dbConnect();
  const userId = await getUserIdByToken(token);
  if (!userId) {
    redirect("/signin");
  }

  // Provide the type to .lean<IEvent[]>()
  const approvedEvents = await Event.find({ status: "approved" }).lean<IEvent[]>();

  return (
    <main className="p-6">
      <NextBlock/>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Approved Events</h2>
        {approvedEvents.length === 0 ? (
          <p>No approved events yet.</p>
        ) : (
          <ul className="space-y-4">
            {approvedEvents.map((ev) => (
              <li key={ev._id.toString()} className="border rounded p-4">
                <h3 className="font-bold">{ev.title}</h3>
                <p>Date: {new Date(ev.date).toLocaleDateString()}</p>
                <p>Location: {ev.location}</p>
                {ev.image && (
                  <img
                    src={ev.image}
                    alt="Event"
                    className="max-w-sm mt-2 object-cover"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
