import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import PrivateHeader from "@/components/mainpage/topheader/header";

export default async function ExhibitPage() {
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
        <h1 className="text-2xl font-bold">Exhibit Page</h1>
        <p className="mt-4">A private exhibit area – for authorized users only.</p>
      </main>
    </div>
  );
}
