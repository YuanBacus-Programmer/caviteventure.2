"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Signed out successfully!");
        router.push("/signin");
      } else {
        setStatus(data.message || "Sign out error.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred during sign out.");
    }
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Sign Out
      </button>
      {status && <p className="mt-2 text-sm text-red-700">{status}</p>}
    </div>
  );
}
