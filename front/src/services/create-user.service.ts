import { ICreateUserDTO } from "@/dto/user.dtos";
import { TSignUpInputDTO } from "@/schemas/sign-up-form.schema";

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