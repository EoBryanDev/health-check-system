
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export const postUserLoginMutationKey = () =>
    ["user-login"] as const;

export const useLogin = () => {

    const router = useRouter();
    return useMutation({
        mutationKey: postUserLoginMutationKey(),
        mutationFn: async (data: { email: string; password?: string }) => {

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Falha no login. Verifique suas credenciais.');
            }
            return response.json();
        },

        onSuccess: () => {
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        },

        onError: (error) => {
            console.error('Erro no login:', error.message);
        },
    })
}