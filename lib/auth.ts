import { logInWithCredentials } from "@/api";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { decodeJWT, encodeJWT } from "./jwt";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, getServerSession } from "next-auth";

const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password
                if (!email || !password) return null;
                try {
                    const user = await logInWithCredentials(email, password);
                    return user;
                } catch (error) {
                    console.error("ERROR ON AUTHORIXE", error.message);
                    return null;
                }
            },
        })
    ],
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user, account, trigger }) => {
            console.log("from callback", token)
            console.log(user)
            console.log(account)
            console.log(trigger)

            return token
        },
        signIn: async ({ credentials, profile, user, account }) => {
            console.log(credentials)
            console.log(profile)
            console.log(user)
            console.log(account)
            return '/unauthorized'
        },
        // session: async ({ session, token, trigger, user }) => {
        //     console.log(session)
        //     console.log(token)
        //     console.log(trigger)
        //     console.log(user)
        //     return session
        // }
    },
    jwt: {
        encode: async ({ token, secret }) => {
            console.log("FROM ENCODE", token)
            return encodeJWT(token, secret);
        },
        decode: async ({ token, secret }): Promise<JWT | null> => {
            return await decodeJWT(token, secret) as JWT;
        },
    }
}

function getSession(  // <-- use this function to access the jwt from React components
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}

export { getSession, authOptions }  // <-- export getSession and authOptions 