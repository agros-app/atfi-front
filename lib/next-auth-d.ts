import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            authId: string;
            token: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        authId: string;
        token: string;
    }
}