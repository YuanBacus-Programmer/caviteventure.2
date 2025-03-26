export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventClient from "./CreateEventClient";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export default async function CreateEventPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // Build absolute URL
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  // Verify admin via /api/auth/me
  const authRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // Additional DB check
  await dbConnect();
  const isAdminUser = await User.findById(authData.user._id).lean();
  if (!isAdminUser || isAdminUser.role !== "admin") {
    redirect("/signin");
  }

  // Render the Create Event form
  return <CreateEventClient />;
}
