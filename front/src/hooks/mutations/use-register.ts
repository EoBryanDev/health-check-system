import { useMutation } from '@tanstack/react-query';
import { TSignUpSchema } from '@/schemas/sign-up-form.schema';
import { useRouter } from "next/navigation";
import { createUser } from '@/services/user.service';

export const userRegisterMutationKey = () => ["user-register"] as const;

export function useRegister() {
    const router = useRouter();
    return useMutation({
        mutationKey: userRegisterMutationKey(),
        mutationFn: async (userData: TSignUpSchema) => {
            // A camada de serviço agora lida com o fetch
            return createUser(userData);
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