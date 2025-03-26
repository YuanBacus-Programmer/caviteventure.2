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
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // Build absolute URL using VERCEL_URL or fallback to localhost
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  // Verify user is admin via /api/auth/me using absolute URL
  const authRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // Fetch additional dashboard data
  await dbConnect();
  const dashRes = await fetch(`${baseUrl}/api/admin/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const dashData = await dashRes.json();

  if (!dashData?.success) {
    redirect("/signin");
  }

  // Render client component
  return <AdminDashboardClient dashboardData={dashData.data} />;
}
