// File: app/profilepage/page.tsx
export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import User, { type IUser } from "@/models/User";
import { getUserIdByToken } from "@/lib/auth";
import SignOutButton from "@/components/signout/SignOutButton";
import Link from "next/link";

export default async function ProfilePage() {
  // 1) Parse session token
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;
  if (!token) redirect("/signin");

  // 2) Connect & load user
  await dbConnect();
  const userId = await getUserIdByToken(token);
  if (!userId) redirect("/signin");

  const user = (await User.findById(userId).lean()) as IUser | null;
  if (!user) redirect("/signin");

  // At this point, `user.profilePicture` must be present in DB if you saved it there
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Profile</h1>
          <SignOutButton />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Profile Header with Image */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="absolute -bottom-12 left-8">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 border-4 border-white shadow-md flex items-center justify-center">
                  <span className="text-2xl font-medium text-gray-500">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Personal Information
                  </h2>
                  <div className="mt-3 space-y-4">
                    <div>
                      <h3 className="text-xs text-gray-500">Full Name</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {user.name || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">Email Address</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {user.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Account Details
                  </h2>
                  <div className="mt-3 space-y-4">
                    <div>
                      <h3 className="text-xs text-gray-500">Role</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900 capitalize">
                        {user.role || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </h2>
                  <div className="mt-3 space-y-4">
                    <div>
                      <h3 className="text-xs text-gray-500">City</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {user.city || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Personal Details
                  </h2>
                  <div className="mt-3 space-y-4">
                    <div>
                      <h3 className="text-xs text-gray-500">Gender</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900 capitalize">
                        {user.gender || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Edit Button */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end">
            <Link
              href="/profilepage/edit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 
                     3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
