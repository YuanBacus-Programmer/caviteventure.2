"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateEventClient({
  eventData,
}: {
  eventData: string;
}) {
  const router = useRouter();
  // Parse the event data from props
  const parsedEvent = JSON.parse(eventData);

  const [title, setTitle] = useState(parsedEvent.title);
  const [description, setDescription] = useState(parsedEvent.description);
  const [date, setDate] = useState(parsedEvent.date?.split("T")[0]); // convert "2025-03-28T00:00:00Z" => "2025-03-28"
  const [location, setLocation] = useState(parsedEvent.location);
  const [image, setImage] = useState<string>(parsedEvent.image || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Convert file to base64 if we want to allow updating the image
  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage("");
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      setImage(base64);
    } catch (err) {
      console.error("Failed to convert file:", err);
      setError("Failed to upload image");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/events/${parsedEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          image,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update event");
        return;
      }

      setSuccess("Event updated successfully!");
      // Possibly redirect back to dashboard after a short delay
      // setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Update Event</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-semibold mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-100"
          />
          {image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={image}
                alt="Event preview"
                className="max-w-xs max-h-32 object-cover mt-1 rounded border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
