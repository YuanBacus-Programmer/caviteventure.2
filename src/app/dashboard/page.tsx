// File: app/dashboard/page.tsx
export const runtime = "nodejs"; // SSR environment

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function DashboardPage() {
  // 1) Grab cookies (await if your Next version returns a Promise)
  const cookieStore = await cookies();

  // 2) Get all cookies
  const allCookies = cookieStore.getAll();

  // 3) Build a 'cookie' header string
  //    Provide explicit type for destructured parameters to avoid "implicit any" errors
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // 4) First, check if user is admin by calling /api/auth/me
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const authMeUrl = `${baseUrl}/api/auth/me`;

  const authRes = await fetch(authMeUrl, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  // If not authenticated or not admin, redirect
  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 5) Fetch the actual dashboard data from /api/admin/dashboard
  const dashRes = await fetch(`${baseUrl}/api/admin/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const dashData = await dashRes.json();

  // If something went wrong or user not authorized
  if (!dashData?.success) {
    redirect("/signin");
  }

  // 6) Pass the data to our client component
  return <AdminDashboardClient dashboardData={dashData.data} />;
}
