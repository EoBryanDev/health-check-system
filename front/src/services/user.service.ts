import { TSignInSchema } from "@/schemas/sign-in-form.schema";
import { TSignUpSchema } from "@/schemas/sign-up-form.schema";

const API_INTERNAL_URL = '/api/auth';

export async function createUser(userData: TSignUpSchema) {
    const response = await fetch(`${API_INTERNAL_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Falha ao criar usuário');
    }

    return response.json();
}

export async function login(userData: TSignInSchema) {
    const response = await fetch(`${API_INTERNAL_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Falha ao fazer login');
    }

    return response.json();
}