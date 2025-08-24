// front/src/handlers/auth.handler.ts
import { useMutation } from '@tanstack/react-query';
import { TSignUpSchema } from '@/schemas/sign-up-form.schema';

import { useRouter } from "next/navigation";

export const userRegisterMutationKey = () =>
    ["user-register"] as const;

export function useRegister() {

    const router = useRouter();

    return useMutation({
        mutationKey: userRegisterMutationKey(),
        mutationFn: async (userData: TSignUpSchema) => {
            // Call the new Route Handler
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed.');
            }

            return response.json();
        },

        onSuccess: () => {
            setTimeout(() => {
                router.push('/v1/dashboard');
            }, 3000);
        },

        onError: (error) => {
            console.error('Registration error:', error.message);
        },
    });


}