import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/dbConnect"
import User, { type IUser } from "@/models/User"
import { getUserIdByToken } from "@/lib/auth"
import SignOutButton from "@/components/signout/SignOutButton"
import EditableProfileClient from "@/components/profile/EditableProfileClient"
import Link from "next/link"

export default async function EditProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("sessionToken")?.value
  if (!token) redirect("/signin")

  await dbConnect()
  const userId = await getUserIdByToken(token!)
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

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Link href="/profilepage" className="text-[#654321] hover:text-[#8B4513] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-[#654321] tracking-tight">Edit Profile</h1>
          </div>
          <SignOutButton />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e6d7c3]">
          {/* Profile Header with Gradient */}
          <div className="h-24 bg-gradient-to-r from-[#e6d7c3] to-[#8B4513] relative">
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

          {/* Edit Form Container */}
          <div className="p-8">
            <EditableProfileClient
              initialName={user.name}
              initialEmail={user.email}
              initialCity={user.city}
              initialGender={user.gender}
              initialProfilePicture={user.profilePicture}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

