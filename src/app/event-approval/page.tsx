"use client"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { events } from "@/lib/eventsStorage";

// Mark the page component as async
export default async function EventApprovalPage() {
  // 1) must await cookies()
  const cookieStore = await cookies();
  // 2) now you can call .get("role")
  const role = cookieStore.get("role")?.value;

  if (role !== "superadmin") {
    redirect("/signin");
  }

  return <EventApprovalClient />;
}

// A client component for listing + approving events
function EventApprovalClient() {
  // We can read 'events' in memory
  const pendingEvents = events.filter((ev) => ev.status === "pending");

  const approveEvent = (id: number) => {
    const index = events.findIndex((ev) => ev.id === id);
    if (index >= 0) {
      events[index].status = "approved";
      alert("Event approved!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Event Approval</h1>
      {pendingEvents.length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <ul className="space-y-4">
          {pendingEvents.map((ev) => (
            <li key={ev.id} className="border p-2 rounded">
              <p><strong>Title:</strong> {ev.title}</p>
              <p><strong>Date:</strong> {ev.date}</p>
              <p><strong>Location:</strong> {ev.location}</p>
              <img src={ev.image} alt="Event" className="mt-2 max-w-sm" />
              <p className="mt-1"><strong>Status:</strong> {ev.status}</p>
              <button
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => approveEvent(ev.id)}
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
