"use client";

import React, { useState } from "react";

export default function CreateEventClient() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string>("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper to read file as base64
  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  }

  // Trigger the hidden file input
  const handleChooseImageClick = () => {
    document.getElementById("eventImageInput")?.click();
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/createevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setError(data.error || "Failed to create event");
        return;
      }

      // Show success message
      setSuccess(`Event "${data.event.title}" created successfully!`);

      // Reset the form
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setImage("");
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        {/* Title */}
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

        {/* Description */}
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

        {/* Date */}
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

        {/* Location */}
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

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">
            Event Image
          </label>

          {/* Button to trigger hidden file input */}
          <button
            type="button"
            onClick={handleChooseImageClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Choose Image
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            id="eventImageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Show preview if an image is selected */}
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

        {/* SUBMIT BUTTON: "Post Event" */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Post Event
        </button>
      </form>
    </div>
  );
}
