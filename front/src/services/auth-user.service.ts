import { ILoginUserDTO } from "@/dto/user.dtos";
import { TSignInSchema } from "@/schemas/sign-in-form.schema";


export async function login(userData: TSignInSchema): Promise<ILoginUserDTO> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WS}/login`, {
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

