import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'
import { decodeJWT } from './lib/jwt';

export default withAuth({
    callbacks: {
        authorized: async ({ req, token }) => {
            console.log('token', token);
            const authToken = await getToken({ req, secret: process.env.NEXTAUTH_URL, raw: true });
            console.log('authToken', authToken);
            const verfiedToken = await decodeJWT(authToken, process.env.NEXTAUTH_URL as string)
            console.log('verified', verfiedToken);
            return authToken ? true : false;
        }
    }
})

export const config = {
    matcher: ['/home', '/project:path*', '/projects'],
}