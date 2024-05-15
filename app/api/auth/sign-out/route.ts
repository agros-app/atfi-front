import { auth } from "@/lib/firebaseAuth";
import { deleteSession, getSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO: test this route
  const sessionCookie = getSession();

  if (!sessionCookie)
    return NextResponse.json({ success: false, error: "Session not found." }, { status: 400 });

  deleteSession();

  await auth.signOut();

  return NextResponse.json({ success: true, data: "Signed out successfully." });
}