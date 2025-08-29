import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobsQueryKey } from "../queries/use-job-data";
import { getServicesQueryKey } from "../queries/use-service-data";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { runJob } from "@/services/service.service";

export const useRunServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (data) => {
      const response: IApiResponse<any> = await runJob(data);

      if (!response.success) {
        throw new Error(response.error || "Failed to run job");
      }

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
    },
    onError: (error) => {
      console.error("Error running job:", error);
    },
  });
};
