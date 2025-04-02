// File: app/eventapproval/superadmineventapproval.tsx
"use client";

import React, { useState, useEffect } from "react";

interface IEvent {
  _id: string;
  title: string;
  date: string;
  location: string;
  image?: string;
  status: "pending" | "approved" | "rejected";
}

export default function SuperAdminEventApproval() {
  const [pendingEvents, setPendingEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pending events from your API
  const fetchPendingEvents = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/events/pending");
      if (!res.ok) {
        throw new Error("Failed to fetch pending events.");
      }
      const data = await res.json();
      setPendingEvents(data.events || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error("Failed to approve event");
      }
      // Re-fetch pending events after approving
      fetchPendingEvents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Pending Events</h2>

      {loading && <p>Loading pending events...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {!loading && pendingEvents.length === 0 && !error && (
        <p>No pending events at the moment.</p>
      )}

      <ul className="space-y-4 mt-4">
        {pendingEvents.map((ev) => (
          <li key={ev._id} className="border rounded p-4">
            <h3 className="font-bold text-lg">{ev.title}</h3>
            <p>Date: {new Date(ev.date).toLocaleDateString()}</p>
            <p>Location: {ev.location}</p>
            {ev.image && (
              <img
                src={ev.image}
                alt={ev.title}
                className="max-w-sm mt-2 object-cover"
              />
            )}
            <div className="mt-3">
              <button
                onClick={() => handleApprove(ev._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
