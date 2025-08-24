import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeService } from "@/services/service.service";
import { getServicesQueryKey } from "@/hooks/queries/use-service-data";

export function useRemoveServiceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => removeService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
        },
    });
}