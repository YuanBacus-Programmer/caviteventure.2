// File: app/createevent/page.tsx
export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventClient from "./CreateEventClient";

export default async function CreateEventPage() {
  // 1) Grab cookie store (await if your Next version returns a Promise)
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  // 2) Build a 'cookie' header string
  const cookieHeader = allCookies
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
    .join("; ");

  // 3) Check if user is admin by calling /api/auth/me
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const authMeUrl = `${baseUrl}/api/auth/me`;

  const authRes = await fetch(authMeUrl, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const authData = await authRes.json();

  if (!authData?.isAuthenticated || authData?.user?.role !== "admin") {
    redirect("/signin");
  }

  // 4) If admin, render the client form
  return <CreateEventClient />;
}
