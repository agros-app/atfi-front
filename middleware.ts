import { NextRequest, NextResponse } from "next/server"
import {getSession, getToken} from "./lib/session"
import {isAuthorized} from "@/lib/api";
import {cookies} from "next/headers";

export default async function middleware(req: NextRequest) {
    const token= await getToken()
    const session = await getSession()

    console.log('Verifying Middleware')
    console.log('cookie: ', cookies().get('session')?.value)
    console.log('session: ', session)
    if (!session?.email && !session?.email) {
        console.log('Redirecting to login: ', session)
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    //Passing the token as parameter because of session problem with cookies
    const completeInfo= await isAuthorized(token!!)
    if (completeInfo.status != 200 && session.role !=="ADMIN"){
        console.log('Redirecting to complete-profile: ', session)
        return NextResponse.redirect(new URL('/complete-profile', req.nextUrl))
    }
    console.log('Middleware: ', session)
    return NextResponse.next()
}

export const config = {
    matcher: ['/home','/submit-project','/projects','/portfolio','/profile', '/recover-password/new-password'],
}