import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import PrivateHeader from "@/components/mainpage/topheader/header";

export default async function EventPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;
  if (!token) {
    redirect("/signin");
  }

  // DB check
  await dbConnect();
  const userId = await getUserIdByToken(token!);
  if (!userId) {
    redirect("/signin");
  }

  return (
    <div>
      <main className="p-6">
        <h1 className="text-2xl font-bold">Event Page</h1>
        <p className="mt-4">This is a private event page. Only signed-in users can view it.</p>
      </main>
    </div>
  );
}
