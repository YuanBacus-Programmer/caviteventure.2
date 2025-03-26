// File: app/dashboard/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // ensures no static generation attempt

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";

export default async function DashboardPage() {
  // 1) Grab the cookie store (await if cookies() returns a Promise)
  const cookieStore = await cookies();

  // 2) Get all cookies
  const allCookies = cookieStore.getAll();

  // 3) Build a 'cookie' header string
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // 4) Verify admin
  //    Use a relative fetch (no env var needed)
  const authRes = await fetch("/api/auth/me", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 5) Possibly fetch large "dashboard data" from /api/admin/dashboard
  await dbConnect();
  const dashRes = await fetch("/api/admin/dashboard", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const dashData = await dashRes.json();

  if (!dashData?.success) {
    redirect("/signin");
  }

  // 6) Render the client component with the data
  return <AdminDashboardClient dashboardData={dashData.data} />;
}
