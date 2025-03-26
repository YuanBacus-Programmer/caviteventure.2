// File: app/createevent/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventClient from "./CreateEventClient";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export default async function CreateEventPage() {
  // 1) Grab the cookie store
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  // 2) Build a 'cookie' header string with explicit types
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // 3) Build an absolute URL for the /api/auth/me fetch
  //    On Vercel, VERCEL_URL is set to your domain.
  //    Otherwise, fallback to http://localhost:3000 for local dev.
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // 4) Verify user is admin
  const authRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 5) (Optional) additional checks – e.g., verifying user in DB
  await dbConnect();
  const isAdminUser = await User.findById(authData.user._id).lean();
  if (!isAdminUser || isAdminUser.role !== "admin") {
    redirect("/signin");
  }

  // 6) Render the event creation form
  return <CreateEventClient />;
}
