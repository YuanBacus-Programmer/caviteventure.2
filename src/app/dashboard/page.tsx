export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import dbConnect from "@/lib/dbConnect";

export default async function DashboardPage() {
  // Retrieve cookies
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  // Build absolute URL using VERCEL_URL or fallback to localhost
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // 1) Verify user is admin via /api/auth/me
  const authRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 2) Fetch additional dashboard data
  await dbConnect();
  const dashRes = await fetch(`${baseUrl}/api/admin/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const dashData = await dashRes.json();

  if (!dashData?.success) {
    redirect("/signin");
  }

  // Provide safe defaults in case some fields are missing
  const finalData = {
    totalUsers: dashData.data?.totalUsers ?? 0,
    totalMale: dashData.data?.totalMale ?? 0,
    totalFemale: dashData.data?.totalFemale ?? 0,
    logs: dashData.data?.logs ?? [],
    events: dashData.data?.events ?? [],
    comments: dashData.data?.comments ?? [],
    allUsers: dashData.data?.allUsers ?? [],
    admins: dashData.data?.admins ?? [],
  };

  // Render client component, passing the final data
  return <AdminDashboardClient dashboardData={finalData} />;
}
