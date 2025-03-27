// src/app/homepage/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getUserIdByToken } from "@/lib/auth";
import ClientHome from "./ClientHome";

export default async function HomePage() {
  // Await cookies() as required in Next.js 13.4+
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;

  // If no token, redirect to /signin
  if (!token) {
    redirect("/signin");
  }

  // Connect to the DB and validate the token
  await dbConnect();
  const userId = await getUserIdByToken(token);
  if (!userId) {
    redirect("/signin");
  }

  // Valid session: render the interactive client component
  return <ClientHome />;
}
