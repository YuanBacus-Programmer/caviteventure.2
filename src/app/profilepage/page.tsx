// File: app/profilepage/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import PrivateHeader from "@/components/mainpage/topheader/header";
import SignOutButton from "@/components/signout/SignOutButton";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;
  if (!token) {
    redirect("/signin");
  }

  await dbConnect();
  const userId = await getUserIdByToken(token!);
  if (!userId) {
    redirect("/signin");
  }

  return (
    <div>
      <main className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <SignOutButton />
        </div>
        <p className="mt-4">Your private profile info goes here.</p>
      </main>
    </div>
  );
}
