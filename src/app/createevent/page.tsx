export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventClient from "./CreateEventClient";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function CreateEventPage() {
  try {
    // Retrieve cookies asynchronously
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    // Determine base URL using NEXTAUTH_URL or fallback to localhost
    const baseUrl = process.env.NEXTAUTH_URL || "https://caviteventure.vercel.app/";

    // 1) Verify user is authenticated and has admin role via /api/auth/me
    const authRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (!authRes.ok) {
      console.error("Authentication request failed with status:", authRes.status);
      redirect("/signin");
    }

    const authData = await authRes.json();

    if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
      redirect("/signin");
    }

    // 2) Optional: Additional database verification
    await dbConnect();
    const isAdminUser = await User.findById(authData.user._id).lean();
    if (!isAdminUser || isAdminUser.role !== "admin") {
      redirect("/signin");
    }

    // 3) Render the client component for event creation
    return <CreateEventClient />;
  } catch (error) {
    console.error("Error in CreateEventPage:", error);
    redirect("/signin");
  }
}
