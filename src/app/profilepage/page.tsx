export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import User, { type IUser } from "@/models/User";
import { getUserIdByToken } from "@/lib/auth";
import SignOutButton from "@/components/signout/SignOutButton";
import Link from "next/link";
import { MapPin, UserIcon, Shield, Pencil, Building } from "lucide-react";

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

  // Fix: Assert that user may have a createdAt property.
  const createdAt = (user as IUser & { createdAt?: string }).createdAt;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0e5] to-[#e6d7c3]">
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

      <main className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#654321] tracking-tight flex items-center">
            <Building className="w-6 h-6 mr-2 text-[#8B4513]" />
            Zentry Profile
          </h1>
          <SignOutButton />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e6d7c3]">
          {/* Profile Header with Image */}
          <div className="relative">
            <div className="h-48 sm:h-56 bg-gradient-to-r from-[#8B4513] via-[#a67c52] to-[#654321] relative">
              {/* NFT-style pattern overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              {/* Silhouette of buildings */}
              <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
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
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-4 border-white shadow-lg transform transition-transform group-hover:scale-105">
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl bg-gradient-to-br from-[#e6d7c3] to-[#8B4513] border-4 border-white shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                    <span className="text-4xl font-medium text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "Z"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#654321] shadow-md">
                {user.role ? (
                  <span className="capitalize flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#8B4513] mr-2"></span>
                    {user.role}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#a67c52] mr-2"></span>
                    Zentry Member
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
                    <UserIcon className="h-4 w-4 mr-2" />
                    Personal Information
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">Full Name</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">{user.name || "Not provided"}</p>
                    </div>
                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">Email Address</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">{user.email || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Account Details
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">Role</h3>
                      <div className="mt-1 flex items-center">
                        <span className="text-lg font-medium text-[#654321] capitalize">
                          {user.role || "Not specified"}
                        </span>
                        {user.role === "admin" && (
                          <span className="ml-2 px-2 py-0.5 bg-[#8B4513] text-white text-xs rounded-md">Admin</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">Account Status</h3>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-lg font-medium text-[#654321]">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">City</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">{user.city || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-[#8B4513] uppercase tracking-wider flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Personal Details
                  </h2>
                  <div className="mt-4 space-y-5">
                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">Gender</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321] capitalize">
                        {user.gender || "Not specified"}
                      </p>
                    </div>

                    <div className="bg-[#f5f0e5] p-5 rounded-xl shadow-sm border border-[#e6d7c3]/50 hover:shadow-md transition-shadow">
                      <h3 className="text-xs text-[#8B4513]">Member Since</h3>
                      <p className="mt-1 text-lg font-medium text-[#654321]">
                        {createdAt
                          ? new Date(createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Edit Button */}
          <div className="px-6 sm:px-8 py-6 bg-gradient-to-r from-[#f5f0e5] to-[#e6d7c3] border-t border-[#e6d7c3] flex justify-end">
            <Link
              href="/profilepage/edit"
              className="px-5 py-2.5 bg-gradient-to-r from-[#8B4513] to-[#654321] hover:from-[#654321] hover:to-[#543210] text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
