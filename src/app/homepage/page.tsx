// app/homepage/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";

export default async function HomePage() {
  // 1) must await cookies() in Next.js 13.4+ 
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;

  // 2) if no token => redirect
  if (!token) {
    redirect("/signin");
  }

  // 3) real DB check
  await dbConnect();
  const userId = await getUserIdByToken(token);
  if (!userId) {
    redirect("/signin");
  }

  // 4) valid session => render
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your private homepage!</h1>
      <p className="mt-4">This area is only accessible if you have a valid session.</p>
    </div>
  );
}
