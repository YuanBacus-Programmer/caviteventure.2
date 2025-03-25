import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import PrivateHeader from "@/components/mainpage/topheader/header";

// For demonstration: an in-memory array of events
// In a real app, store/fetch these from a database
const events = [
  {
    id: 1,
    image: "https://example.com/image1.jpg",
    title: "Approved Event 1",
    date: "2025-12-01",
    location: "City Hall",
    status: "approved" as const,
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
    title: "Pending Event 2",
    date: "2025-10-15",
    location: "Convention Center",
    status: "pending" as const,
  },
  {
    id: 3,
    image: "https://example.com/image3.jpg",
    title: "Approved Event 3",
    date: "2026-01-20",
    location: "Sports Arena",
    status: "approved" as const,
  },
];

export default async function EventPage() {
  // 1) Check if there's a session token
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;
  if (!token) {
    redirect("/signin");
  }

  // 2) DB check for the user
  await dbConnect();
  const userId = await getUserIdByToken(token!);
  if (!userId) {
    redirect("/signin");
  }

  // 3) Filter approved events
  const approvedEvents = events.filter((ev) => ev.status === "approved");

  return (
    <div>
      <PrivateHeader />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Event Page</h1>
        <p className="mt-4">A private event page. Only signed-in users can view it.</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Approved Events</h2>
          {approvedEvents.length === 0 ? (
            <p>No approved events yet.</p>
          ) : (
            <ul className="space-y-4">
              {approvedEvents.map((ev) => (
                <li key={ev.id} className="border rounded p-4">
                  <h3 className="font-bold">{ev.title}</h3>
                  <p>Date: {ev.date}</p>
                  <p>Location: {ev.location}</p>
                  <img src={ev.image} alt="Event" className="max-w-sm mt-2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
