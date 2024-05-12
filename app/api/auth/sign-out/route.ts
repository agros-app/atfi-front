import { auth } from "@/lib/firebaseAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO: test this route
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie)
    return NextResponse.json({ success: false, error: "Session not found." }, { status: 400 });

  cookies().delete("__session");

  await auth.signOut();

  return NextResponse.json({ success: true, data: "Signed out successfully." });
}