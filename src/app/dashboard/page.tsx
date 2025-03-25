// File: app/dashboard/page.tsx
export const runtime = "nodejs"; // Ensure SSR environment

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 1) Grab the cookies store
  const cookieStore = await cookies();

  // 2) Get all cookies as an array
  const allCookies = cookieStore.getAll();

  // 3) Build a 'cookie' header string
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // If you have NEXT_PUBLIC_BASE_URL set in your .env, use that,
  // or fall back to http://localhost:3000
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // 4) Make an absolute request to /api/auth/me
  const authMeUrl = `${baseUrl}/api/auth/me`;
  const res = await fetch(authMeUrl, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  // 5) Parse the response
  const data = await res.json();

  // 6) If not authenticated or not admin, redirect to /signin
  if (!data?.isAuthenticated || data?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 7) Otherwise, show the dashboard
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">Welcome, admin!</p>
    </div>
  );
}
