"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ProfileFormProps = {
  initialName: string;
  initialCity: string;
  initialGender: "male" | "female";
};

export default function ProfileForm({ initialName, initialCity, initialGender }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [city, setCity] = useState(initialCity);
  const [gender, setGender] = useState<"male" | "female">(initialGender);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsSaving(true);

    try {
      const res = await fetch("/api/auth/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, gender }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Profile updated successfully!");
        // Optionally, refresh page or update local state as needed.
      } else {
        setStatus(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus("An error occurred while updating your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xl font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xl font-semibold text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      {status && <p className="mt-4 font-semibold text-gray-700">{status}</p>}
      <button
        type="submit"
        disabled={isSaving}
        className={`mt-6 w-full p-3 rounded font-medium text-white transition ${
          isSaving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
