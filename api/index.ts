const API_URL = 'http://localhost:3000';

type AuthResponse = {
    token: string;
}

export const logInWithCredentials = async (email: string, password: string): Promise<AuthResponse | null> => {
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
    if (!response.ok) {
        return null;
    }
    return response.json();
}

// export const registerWithCredentials = async (email: string, password: string): Promise<AuthResponse | null> => {}