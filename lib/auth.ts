import { logInWithCredentials } from "@/api";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { decodeJWT, encodeJWT } from "./jwt";
import { JWT } from "next-auth/jwt";

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
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password
                if (!email || !password) return null;
                const res = await logInWithCredentials(email, password);
                return { id: "1", name: "J Smith", email: "jsmith@example.com" }
                // return res;
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        encode: async ({ token, secret }) => {
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