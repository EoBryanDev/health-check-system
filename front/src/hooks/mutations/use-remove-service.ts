// src/hooks/mutations/use-remove-service-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeService } from "@/services/service.service";
import { getServicesQueryKey } from "../queries/use-service-data";

export const useRemoveServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (serviceId) => {
      await removeService(serviceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
    },
    onError: (error) => {
      console.error("Error removing service:", error);
    },
  });
};