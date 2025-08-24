import { ICreateUserDTO } from "@/dto/user.dtos";
import { TSignUpInputDTO } from "@/schemas/sign-up-form.schema";
import { ILoginUserDTO } from "@/dto/user.dtos";
import { TSignInSchema } from "@/schemas/sign-in-form.schema";

export async function createUser(userData: TSignUpInputDTO): Promise<ICreateUserDTO> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WS}/users`, {
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

