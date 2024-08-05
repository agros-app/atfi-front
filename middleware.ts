import { NextRequest, NextResponse } from "next/server"
import { getSession } from "./lib/session"

export default async function middleware(req: NextRequest) {
    const session = await getSession()
    if (!session?.uid && !session?.authId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/home'],
}