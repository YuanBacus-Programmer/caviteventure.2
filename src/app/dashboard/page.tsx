// File: app/dashboard/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import dbConnect from "@/lib/dbConnect";

export default async function DashboardPage() {
  // 1) Gather & build cookies
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // 2) Build an absolute base URL
  //    *VERCEL_URL* is automatically set by Vercel in production
  //    Locally, fallback to "http://localhost:3000" (or your local dev domain/port)
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  // 3) Fetch /api/auth/me with an absolute URL
  const authRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();
  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 4) Optionally fetch additional dashboard data from /api/admin/dashboard
  await dbConnect(); // If needed for your subsequent logic
  const dashRes = await fetch(`${baseUrl}/api/admin/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const dashData = await dashRes.json();
  if (!dashData?.success) {
    redirect("/signin");
  }

  // 5) Render your client component with the data
  return <AdminDashboardClient dashboardData={dashData.data} />;
}
