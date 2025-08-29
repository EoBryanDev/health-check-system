import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { createUser } from '@/services/user.service';
import { ICreateUserInputDTO } from '@/interfaces/IUser';

export const userRegisterMutationKey = () => ["user-register"] as const;

export function useRegister() {
    const router = useRouter();
    return useMutation({
        mutationKey: userRegisterMutationKey(),
        mutationFn: async (userData: ICreateUserInputDTO) => {
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