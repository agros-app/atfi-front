import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

interface UserSession extends JWTPayload {
    uid: string
    displayName: string
    email: string
    photoURL: string
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: UserSession): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload as UserSession
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userSession: UserSession) {
    // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt(userSession)

    cookies().set('session', session, {
        httpOnly: true,
        //   secure: true,
        //   expires: expiresAt,
        //   sameSite: 'lax',
        //   path: '/',
    })
}

export async function updateSession() {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set('session', session, {
        httpOnly: true,
        // secure: true,
        // expires: expires,
        // sameSite: 'lax',
        // path: '/',
    })
}

export const getSession = async (): Promise<UserSession | null> => {
    const session = cookies().get('session')?.value
    if (!session) {
        return null
    }

    const payload = await decrypt(session)

    if (typeof payload === 'undefined') {
        return null
    }
    return payload
}

export const getToken = async (): Promise<string | null> => {
    const session = cookies().get('session')?.value
    if (!session) {
        return null
    }
    return session
}
export function deleteSession() {
    cookies().delete('session')
}