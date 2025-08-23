
import { useMutation } from "@tanstack/react-query";

export const postUserLoginMutationKey = () =>
    ["user-login"] as const;

export const useLogin = () => {
    return useMutation({
        mutationKey: postUserLoginMutationKey(),
        mutationFn: async (data: { email: string; password?: string }) => {
            console.log('here');

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

        onError: (error) => {
            console.error('Erro no login:', error.message);
        },
    })
}