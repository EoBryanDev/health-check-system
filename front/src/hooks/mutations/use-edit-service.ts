import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { updateService } from "@/services/service.service";
import { getServicesQueryKey } from "../queries/use-service-data";
import { IServiceInputDTO, IServiceOutputDTO } from "@/interfaces/IService";

export const useEditServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IServiceOutputDTO, Error, IServiceInputDTO>({
    mutationFn: async (serviceData: IServiceInputDTO) => {
      if (!serviceData.service_id) {
        throw new Error("service ID is required for editing.");
      }
      const response: IApiResponse<IServiceOutputDTO> = await updateService(serviceData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
    },
    onError: (error) => {
      console.error("Error updating service:", error);
    },
  });
};