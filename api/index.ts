import { User } from "next-auth";

const API_URL = 'http://localhost:3000';

export const logInWithCredentials = async (email: string, password: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("ERROR ON LOGIN", error);
        // @ts-ignore
        return error;
    }

}

// export const registerWithCredentials = async (email: string, password: string): Promise<AuthResponse | null> => {}