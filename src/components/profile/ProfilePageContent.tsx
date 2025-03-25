"use client";

import React from "react";
import dynamic from "next/dynamic";
import PrivateHeader from "@/components/mainpage/topheader/header";
import SignOutButton from "@/components/signout/SignOutButton";

// Dynamically import EditProfileButton in a client component
const EditProfileButton = dynamic(
  () => import("@/components/profile/EditProfileButton"),
  { ssr: false }
);

type ProfilePageContentProps = {
  user: {
    name: string;
    email: string;
    city: string;
    gender: "male" | "female";
  };
};

export default function ProfilePageContent({ user }: ProfilePageContentProps) {
  return (
    <div>
      <main className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
          <SignOutButton />
        </div>
        <div className="mb-6">
          {/* Display read-only profile info */}
          <div className="bg-white shadow rounded-lg p-6 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Name</h2>
                <p className="mt-2 text-gray-600">{user.name}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Email</h2>
                <p className="mt-2 text-gray-600">{user.email}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">City</h2>
                <p className="mt-2 text-gray-600">{user.city}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Gender</h2>
                <p className="mt-2 text-gray-600 capitalize">{user.gender}</p>
              </div>
            </div>
          </div>
          {/* Edit button */}
          <div className="text-right">
            <EditProfileButton />
          </div>
        </div>
      </main>
    </div>
  );
}
