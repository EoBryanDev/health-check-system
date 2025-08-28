import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/services/user.service";
import { ILoginInputDTO } from "@/interfaces/IUser";

export const postUserLoginMutationKey = () => ["user-login"] as const;

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: postUserLoginMutationKey(),
        mutationFn: async (data: ILoginInputDTO) => {
            // A camada de serviço agora lida com o fetch
            return login(data);
        },
        onSuccess: () => {
            setTimeout(() => {
                router.push('/v1/dashboard');
            }, 3000);
        },
        onError: (error) => {
            console.error('Erro no login:', error.message);
        },
    });
};