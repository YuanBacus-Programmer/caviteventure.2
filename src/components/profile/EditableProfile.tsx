"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type EditableProfileProps = {
  initialName: string;
  initialEmail: string;
  initialCity: string;
  initialGender: "male" | "female";
  initialProfilePicture?: string;
};

export default function EditableProfile({
  initialName,
  initialEmail,
  initialCity,
  initialGender,
  initialProfilePicture,
}: EditableProfileProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [city, setCity] = useState(initialCity);
  const [gender, setGender] = useState<"male" | "female">(initialGender);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(initialProfilePicture);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Simulate an image upload; in production, upload to S3/Cloudinary, etc.
  const handleFileUpload = async (file: File): Promise<string> => {
    setUploading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setUploading(false);
        resolve(url);
      }, 2000); // simulate 2 seconds delay
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Immediately show a preview (object URL)
      const previewUrl = URL.createObjectURL(file);
      setProfilePicture(previewUrl);
      // Simulate the upload process
      const uploadedUrl = await handleFileUpload(file);
      setProfilePicture(uploadedUrl);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsSaving(true);
    try {
      const res = await fetch("/api/auth/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, gender, profilePicture }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Profile updated successfully.");
        // After a short delay, navigate back to the main profile page.
        setTimeout(() => {
          router.push("/profilepage");
        }, 1500);
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

  const handleCancel = () => {
    setName(initialName);
    setCity(initialCity);
    setGender(initialGender);
    setProfilePicture(initialProfilePicture);
    setStatus("");
  };

  return (
    <form onSubmit={handleSave} className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition">
            {uploading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <span>📷</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xl font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={initialEmail}
            readOnly
            className="mt-2 p-3 border border-gray-300 rounded w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      {status && <p className="mt-4 font-semibold text-gray-700">{status}</p>}
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          disabled={isSaving}
          className={`flex-1 p-3 rounded text-white font-medium transition ${
            isSaving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 p-3 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
