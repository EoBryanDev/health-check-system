import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getServicesQueryKey } from "@/hooks/queries/use-service-data";
import { IServiceInputDTO } from "@/interfaces/IConfigurations";
import { addService } from "@/services/service.service";

// O tipo de 'mutationFn' agora é 'IServiceInputDTO'
export function useAddServiceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: IServiceInputDTO) => addService(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
        },
    });
}