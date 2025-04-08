export const runtime = "nodejs"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/dbConnect"
import User, { type IUser } from "@/models/User"
import { getUserIdByToken } from "@/lib/auth"
import SignOutButton from "@/components/signout/SignOutButton"
import Link from "next/link"
import { MapPin, UserIcon, Shield, Pencil, Building, Calendar, Mail, Check, AtSign } from "lucide-react"

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

  // Fix: Assert that user may have a createdAt property.
  const createdAt = (user as IUser & { createdAt?: string }).createdAt

  // Format date for display
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available"

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f0] to-[#ece3d5]">
      {/* Decorative buildings background - more subtle */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden opacity-5 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200' fill='%23654321'%3E%3Cpath d='M50,200 L50,100 L75,100 L75,80 L100,80 L100,100 L125,100 L125,200 Z M150,200 L150,120 L175,120 L175,100 L200,100 L200,80 L225,80 L225,100 L250,100 L250,120 L275,120 L275,200 Z M300,200 L300,80 L325,80 L325,60 L350,60 L350,40 L375,40 L375,60 L400,60 L400,80 L425,80 L425,200 Z M450,200 L450,100 L475,100 L475,70 L500,70 L500,40 L525,40 L525,70 L550,70 L550,100 L575,100 L575,200 Z M600,200 L600,120 L625,120 L625,90 L650,90 L650,70 L675,70 L675,90 L700,90 L700,120 L725,120 L725,200 Z M750,200 L750,80 L775,80 L775,60 L800,60 L800,40 L825,40 L825,60 L850,60 L850,80 L875,80 L875,200 Z M900,200 L900,100 L925,100 L925,80 L950,80 L950,100 L975,100 L975,200 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 200px",
          }}
        ></div>
      </div>

      <main className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#654321] tracking-tight flex items-center">
            <Building className="w-6 h-6 mr-2 text-[#8B4513]" />
            Zentry Profile
          </h1>
          <div className="flex items-center">
            <SignOutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#e6d7c3]">
              <div className="h-32 bg-gradient-to-r from-[#8B4513] via-[#a67c52] to-[#654321] relative">
                {/* NFT-style pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              <div className="flex flex-col items-center -mt-16 px-6 pb-6">
                <div className="relative group mb-4">
                  {user.profilePicture ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition-transform group-hover:scale-105">
                      <img
                        src={user.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#e6d7c3] to-[#8B4513] border-4 border-white shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                      <span className="text-4xl font-medium text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "Z"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-[#654321] text-center">{user.name || "Zentry User"}</h2>

                <div className="mt-1 flex items-center justify-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f5f0e5] text-[#8B4513] border border-[#e6d7c3]">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                    <span className="capitalize">{user.role || "Member"}</span>
                  </span>
                </div>

                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-[#654321]">
                    <Mail className="w-4 h-4 text-[#8B4513]" />
                    <span className="text-sm truncate">{user.email || "No email provided"}</span>
                  </div>

                  {user.city && (
                    <div className="flex items-center gap-3 text-[#654321]">
                      <MapPin className="w-4 h-4 text-[#8B4513]" />
                      <span className="text-sm">{user.city}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-[#654321]">
                    <Calendar className="w-4 h-4 text-[#8B4513]" />
                    <span className="text-sm">Member since {formattedDate}</span>
                  </div>
                </div>

                <Link
                  href="/profilepage/edit"
                  className="w-full mt-6 px-5 py-2.5 bg-gradient-to-r from-[#8B4513] to-[#654321] hover:from-[#654321] hover:to-[#543210] text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden border border-[#e6d7c3]">
              <div className="px-6 py-4 border-b border-[#e6d7c3]">
                <h3 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Account Status
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#654321]">Account Type</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#f5f0e5] text-[#8B4513] border border-[#e6d7c3]">
                      {user.role === "admin" ? "Administrator" : "Standard"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#654321]">Status</span>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm font-medium text-[#654321]">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#654321]">Email Verified</span>
                    <div className="flex items-center gap-1.5 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#e6d7c3]">
              <div className="px-6 py-4 border-b border-[#e6d7c3]">
                <h3 className="text-xl font-bold text-[#654321]">Profile Information</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#f8f5f0] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <UserIcon className="h-4 w-4 text-[#8B4513]" />
                        <h3 className="text-sm font-medium text-[#8B4513]">Full Name</h3>
                      </div>
                      <p className="text-lg font-medium text-[#654321]">{user.name || "Not provided"}</p>
                    </div>

                    <div className="bg-[#f8f5f0] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <AtSign className="h-4 w-4 text-[#8B4513]" />
                        <h3 className="text-sm font-medium text-[#8B4513]">Email Address</h3>
                      </div>
                      <p className="text-lg font-medium text-[#654321]">{user.email || "Not provided"}</p>
                    </div>

                    <div className="bg-[#f8f5f0] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-[#8B4513]" />
                        <h3 className="text-sm font-medium text-[#8B4513]">City</h3>
                      </div>
                      <p className="text-lg font-medium text-[#654321]">{user.city || "Not provided"}</p>
                    </div>

                    <div className="bg-[#f8f5f0] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <UserIcon className="h-4 w-4 text-[#8B4513]" />
                        <h3 className="text-sm font-medium text-[#8B4513]">Gender</h3>
                      </div>
                      <p className="text-lg font-medium text-[#654321] capitalize">{user.gender || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="bg-[#f8f5f0] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <UserIcon className="h-4 w-4 text-[#8B4513]" />
                      <h3 className="text-sm font-medium text-[#8B4513]">Bio</h3>
                    </div>
                    <p className="text-[#654321]">
                      {user.bio || "No bio provided. Tell us about yourself by editing your profile."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden border border-[#e6d7c3]">
              <div className="px-6 py-4 border-b border-[#e6d7c3]">
                <h3 className="text-xl font-bold text-[#654321]">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="relative pl-6 border-l-2 border-[#e6d7c3] space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[29px] w-5 h-5 rounded-full bg-[#8B4513]"></div>
                    <div className="mb-1 text-sm font-medium text-[#654321]">Account Created</div>
                    <div className="text-xs text-[#8B4513]">{formattedDate}</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] w-5 h-5 rounded-full bg-[#a67c52]"></div>
                    <div className="mb-1 text-sm font-medium text-[#654321]">Profile Completed</div>
                    <div className="text-xs text-[#8B4513]">Your profile is 70% complete</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] w-5 h-5 rounded-full bg-[#a67c52]"></div>
                    <div className="mb-1 text-sm font-medium text-[#654321]">Last Login</div>
                    <div className="text-xs text-[#8B4513]">Today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
