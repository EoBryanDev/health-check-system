import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "@/services/service.service";
import { IServiceInputDTO, IServiceOutputDTO } from "@/interfaces/IService";
import { getServicesQueryKey } from "../queries/use-service-data";

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation<IServiceOutputDTO, Error, IServiceInputDTO>({
        mutationFn: async (newServiceData) => {
            const response = await createService(newServiceData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
        },
        onError: (error) => {
            console.error("Error creating service:", error);
        },
    });
};