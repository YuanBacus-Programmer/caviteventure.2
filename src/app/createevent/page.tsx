export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventClient from "./CreateEventClient";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export default async function CreateEventPage() {
  // Build a cookie header string for our internal fetch
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // Build the absolute URL for /api/auth/me
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  // 1) Check if user is authenticated + admin via /api/auth/me
  const authRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store", // ensure we always get the latest
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 2) Extra DB check (optional)
  await dbConnect();
  const isAdminUser = await User.findById(authData.user._id).lean();
  if (!isAdminUser || isAdminUser.role !== "admin") {
    redirect("/signin");
  }

  // 3) If admin, render the client form
  return <CreateEventClient />;
}
