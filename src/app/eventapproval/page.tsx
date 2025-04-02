// File: app/eventapproval/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";
import SuperAdminEventApproval from "./superadmineventapproval"; // Import the client component below

export const runtime = "nodejs"; // If you need node APIs

export default async function EventApprovalPage() {
  // 1) Connect to DB
  await dbConnect();

  // 2) Get sessionToken from cookies
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value || null;

  console.log("EventApproval => sessionToken:", sessionToken);
  if (!sessionToken) {
    console.log("No session token found.");
    redirect("/signin");
  }

  // 3) Convert sessionToken -> userId
  const userId = await getUserIdByToken(sessionToken);
  console.log("EventApproval => userId from token:", userId);
  if (!userId) {
    console.log("Invalid session token or user not found in sessions.");
    redirect("/signin");
  }

  // 4) Fetch the user from DB
  const user = await User.findById(userId).lean();
  console.log("EventApproval => DB user:", user);
  if (!user) {
    console.log("No matching user doc in DB.");
    redirect("/signin");
  }

  // 5) Check if role is superadmin
  if (user.role !== "superadmin") {
    console.log(`User role: ${user.role} (not superadmin).`);
    redirect("/signin");
  }

  // If user is superadmin, we render the client component UI
  console.log("User is superadmin. Access granted.");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Approval</h1>
      <p>Here, the superadmin can approve or reject events submitted by admins.</p>

      {/* Client component for approving events */}
      <SuperAdminEventApproval />
    </div>
  );
}
