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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Link href="/profilepage" className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
          </div>
          <SignOutButton />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Profile Header with Gradient */}
          <div className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

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

