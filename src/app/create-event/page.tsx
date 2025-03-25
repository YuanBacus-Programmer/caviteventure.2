// File: app/create-event/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventClient from "./CreateEventClient"; // a client component
import { events } from "@/lib/eventsStorage";

// Mark the page component async
export default async function CreateEventPage() {
  // Must await cookies()
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  // Check role
  if (role !== "admin" && role !== "superadmin") {
    redirect("/signin");
  }

  return <CreateEventClient />;
}
