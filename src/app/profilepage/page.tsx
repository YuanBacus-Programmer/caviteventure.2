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
    <div className="min-h-screen bg-[#f5f0e5]">
      {/* Decorative buildings background */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden opacity-10 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200' fill='%23654321'%3E%3Cpath d='M50,200 L50,100 L75,100 L75,80 L100,80 L100,100 L125,100 L125,200 Z M150,200 L150,120 L175,120 L175,100 L200,100 L200,80 L225,80 L225,100 L250,100 L250,120 L275,120 L275,200 Z M300,200 L300,80 L325,80 L325,60 L350,60 L350,40 L375,40 L375,60 L400,60 L400,80 L425,80 L425,200 Z M450,200 L450,100 L475,100 L475,70 L500,70 L500,40 L525,40 L525,70 L550,70 L550,100 L575,100 L575,200 Z M600,200 L600,120 L625,120 L625,90 L650,90 L650,70 L675,70 L675,90 L700,90 L700,120 L725,120 L725,200 Z M750,200 L750,80 L775,80 L775,60 L800,60 L800,40 L825,40 L825,60 L850,60 L850,80 L875,80 L875,200 Z M900,200 L900,100 L925,100 L925,80 L950,80 L950,100 L975,100 L975,200 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 200px",
          }}
        ></div>
      </div>

      <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-[#654321] tracking-tight">My Profile</h1>
          <SignOutButton />
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e6d7c3]">
          {/* Profile Header with Image */}
          <div className="relative">
            <div className="h-40 sm:h-48 bg-gradient-to-r from-[#e6d7c3] to-[#8B4513] relative">
              {/* Silhouette of Cavite buildings */}
              <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
                <div
                  className="w-full h-full bg-repeat-x"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 80' fill='%23654321'%3E%3Cpath d='M0,80 L50,80 L50,40 L70,40 L70,20 L90,20 L90,40 L110,40 L110,80 L150,80 L150,50 L170,50 L170,30 L190,30 L190,50 L210,50 L210,80 L250,80 L250,30 L270,30 L270,10 L290,10 L290,30 L310,30 L310,80 L350,80 L350,40 L370,40 L370,20 L390,20 L390,40 L410,40 L410,80 L450,80 L450,50 L470,50 L470,30 L490,30 L490,50 L510,50 L510,80 L550,80 L550,30 L570,30 L570,10 L590,10 L590,30 L610,30 L610,80 L650,80 L650,40 L670,40 L670,20 L690,20 L690,40 L710,40 L710,80 L750,80 L750,50 L770,50 L770,30 L790,30 L790,50 L810,50 L810,80 L850,80 L850,30 L870,30 L870,10 L890,10 L890,30 L910,30 L910,80 L950,80 L950,40 L970,40 L970,20 L990,20 L990,40 L1000,40 L1000,80 Z'/%3E%3C/svg%3E")`,
                    backgroundSize: "1000px 80px",
                    opacity: 0.3,
                  }}
                ></div>
              </div>
            </div>
            <div className="absolute -bottom-16 left-6 sm:left-8">
              <div className="relative group">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#e6d7c3] to-[#8B4513] border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-3xl font-medium text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-[#654321]">
                {user.role ? (
                  <span className="capitalize flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#8B4513] mr-2"></span>
                    {user.role}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#a67c52] mr-2"></span>
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
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
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
                    <div className="bg-[#f5f0e5] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8B4513]">Full Name</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">{user.name || "Not provided"}</p>
                    </div>
                    <div className="bg-[#f5f0e5] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8B4513]">Email Address</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">{user.email || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
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
                    <div className="bg-[#f5f0e5] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8B4513]">Role</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321] capitalize">
                        {user.role || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
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
                    <div className="bg-[#f5f0e5] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8B4513]">City</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">{user.city || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
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
                    <div className="bg-[#f5f0e5] p-4 rounded-lg">
                      <h3 className="text-xs text-[#8B4513]">Gender</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321] capitalize">
                        {user.gender || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Edit Button */}
          <div className="px-6 sm:px-8 py-5 bg-[#f5f0e5] border-t border-[#e6d7c3] flex justify-end">
            <Link
              href="/profilepage/edit"
              className="px-5 py-2.5 bg-[#8B4513] hover:bg-[#654321] text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center gap-2 shadow-sm"
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

