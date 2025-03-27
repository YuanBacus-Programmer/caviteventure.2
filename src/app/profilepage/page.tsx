export const runtime = "nodejs"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/dbConnect"
import User, { type IUser } from "@/models/User"
import { getUserIdByToken } from "@/lib/auth"
import SignOutButton from "@/components/signout/SignOutButton"
import Link from "next/link"

export default async function ProfilePage() {
  // 1) Parse session token
  const cookieStore = await cookies()
  const token = cookieStore.get("sessionToken")?.value
  if (!token) redirect("/signin")

  // 2) Connect & load user
  await dbConnect()
  const userId = await getUserIdByToken(token)
  if (!userId) redirect("/signin")

  const user = (await User.findById(userId).lean()) as IUser | null
  if (!user) redirect("/signin")

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-[#5d4037] tracking-tight">My Profile</h1>
          <SignOutButton />
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e6dfd3]">
          {/* Profile Header with Image */}
          <div className="relative">
            <div className="h-40 sm:h-48 bg-gradient-to-r from-[#e6dfd3] to-[#d7cec7]"></div>
            <div className="absolute -bottom-16 left-6 sm:left-8">
              <div className="relative group">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#d7cec7] to-[#a1887f] border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-3xl font-medium text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-[#5d4037]">
                {user.role ? (
                  <span className="capitalize flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#8d6e63] mr-2"></span>
                    {user.role}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                    Member
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-medium text-[#8d6e63] uppercase tracking-wider flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Personal Information
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f8f5f0] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8d6e63]">Full Name</h3>
                      <p className="mt-1 text-lg font-medium text-[#5d4037]">{user.name || "Not provided"}</p>
                    </div>
                    <div className="bg-[#f8f5f0] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8d6e63]">Email Address</h3>
                      <p className="mt-1 text-lg font-medium text-[#5d4037]">{user.email || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-[#8d6e63] uppercase tracking-wider flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Account Details
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f8f5f0] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8d6e63]">Role</h3>
                      <p className="mt-1 text-lg font-medium text-[#5d4037] capitalize">
                        {user.role || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-medium text-[#8d6e63] uppercase tracking-wider flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Location
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f8f5f0] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8d6e63]">City</h3>
                      <p className="mt-1 text-lg font-medium text-[#5d4037]">{user.city || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-[#8d6e63] uppercase tracking-wider flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Personal Details
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f8f5f0] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8d6e63]">Gender</h3>
                      <p className="mt-1 text-lg font-medium text-[#5d4037] capitalize">
                        {user.gender || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Edit Button */}
          <div className="px-6 sm:px-8 py-5 bg-[#f8f5f0] border-t border-[#e6dfd3] flex justify-end">
            <Link
              href="/profilepage/edit"
              className="px-5 py-2.5 bg-[#8d6e63] hover:bg-[#5d4037] text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center gap-2 shadow-sm"
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
  )
}

