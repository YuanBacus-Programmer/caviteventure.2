export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import dbConnect from "@/lib/dbConnect";

export default async function DashboardPage() {
  // Retrieve cookies synchronously (no await needed)
  const cookieStore = cookies();
  
  // Cast the return value to an array with defined properties
  const allCookies = (await cookieStore).getAll() as { name: string; value: string }[];

  // Explicitly type the destructured cookie values to fix implicit 'any' issues
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // 1) Verify user is admin via /api/auth/me using a relative URL.
  const authRes = await fetch(`/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 2) Connect to DB and fetch additional dashboard data.
  await dbConnect();
  const dashRes = await fetch(`/api/admin/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const dashData = await dashRes.json();

  if (!dashData?.success) {
    redirect("/signin");
  }

  // Provide safe defaults in case some fields are missing.
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

  // Render client component, passing the final data.
  return <AdminDashboardClient dashboardData={finalData} />;
}
