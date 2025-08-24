import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editService } from "@/services/service.service";
import { getServicesQueryKey } from "@/hooks/queries/use-service-data";
import { IService } from "@/interfaces/IConfigurations";

export function useEditServiceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: IService) => editService(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
        },
    });
}