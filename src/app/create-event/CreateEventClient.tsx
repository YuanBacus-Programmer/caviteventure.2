"use client";
import React, { useState } from "react";
import { events } from "@/lib/eventsStorage";

export default function CreateEventClient() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      image,
      title,
      date,
      location,
      status: "pending" as const,
    };
    events.push(newEvent);
    setMessage("Event submitted! It's now pending superadmin approval.");

    // Clear form fields
    setImage("");
    setTitle("");
    setDate("");
    setLocation("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            className="border p-2 w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Title</label>
          <input
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            className="border p-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            className="border p-2 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Event Location"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit for Approval
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
