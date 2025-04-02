import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import User from "@/models/User";

export default async function SuperAdminDashboardPage() {
  // 1) Connect to DB
  await dbConnect();

  // 2) Await cookies(), then get sessionToken
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value || null;

  console.log("SuperAdmin Dashboard => sessionToken:", sessionToken);

  // If no session token, user is not logged in
  if (!sessionToken) {
    console.log("No session token found.");
    redirect("/signin");
  }

  // 3) Convert sessionToken -> userId
  const userId = await getUserIdByToken(sessionToken);
  console.log("SuperAdmin Dashboard => userId from token:", userId);

  if (!userId) {
    console.log("Invalid session token or user not found in sessions.");
    redirect("/signin");
  }

  // 4) Fetch the user from DB
  const user = await User.findById(userId).lean();
  console.log("SuperAdmin Dashboard => DB user:", user);

  if (!user) {
    console.log("No matching user doc in DB.");
    redirect("/signin");
  }

  // 5) Check if role is superadmin
  if (user.role !== "superadmin") {
    console.log(`User role: ${user.role} (not superadmin).`);
    redirect("/signin");
  }

  // If user is superadmin, show the dashboard
  console.log("User is superadmin. Access granted.");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SuperAdmin Dashboard</h1>
      <p>This page is only accessible to users with the "superadmin" role.</p>
    </div>
  );
}
