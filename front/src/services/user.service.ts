import { ICreateUserInputDTO, ILoginInputDTO } from "@/interfaces/IUser";
import { TSignInSchema } from "@/schemas/sign-in-form.schema";

const API_INTERNAL_URL = '/api';

export async function createUser(userData: ICreateUserInputDTO) {
    const response = await fetch(`${API_INTERNAL_URL}/auth/register`, {
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

export async function login(userData: ILoginInputDTO) {
    const response = await fetch(`${API_INTERNAL_URL}/auth/login`, {
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

export async function getUserInfo() {

    const response = await fetch(`${API_INTERNAL_URL}/users`, {
        method: 'GET',
    });

    if (!response.ok) {
        const error = await response.json();
        return { success: false, data: null, error: error.message };
    }

    if (response.status === 204) {
        return { success: true, data: null };
    }

    return response.json();
}