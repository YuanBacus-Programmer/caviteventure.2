// File: app/verify-email/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verifyCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Verification successful! You can now sign in.");
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      } else {
        setStatus(data.message || "Verification error.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred while verifying.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <form onSubmit={handleVerify} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Verification Code (6 digits):</label>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        {status && <p className="mt-2 font-semibold text-gray-700">{status}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 p-3 rounded text-white font-medium ${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
