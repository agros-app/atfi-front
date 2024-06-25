import { SignJWT, jwtVerify } from "jose";
import { JWT } from "next-auth/jwt";


const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_URL);

export const encodeJWT = (token: JWT | undefined, secret: string | Buffer) => {
    if (!token) { return ""; }
    return new SignJWT(token)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(secretKey);
}

export const decodeJWT = async (token: string | undefined, secret: string | Buffer) => {
    if (!token) { return null; }
    const payload = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    if (!payload) { return null; }
    return payload.payload;
}