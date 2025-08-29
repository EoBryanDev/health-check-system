import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobsQueryKey } from "../queries/use-job-data";
import { getServicesQueryKey } from "../queries/use-service-data";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { runJob } from "@/services/job.service";

export const useRunSingleJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response: IApiResponse<any> = await runJob({ id, mode: 'single' });

      if (!response.success) {
        throw new Error(response.error || "Failed to run single job");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
    },
    onError: (error) => {
      console.error("Error running single job:", error);
    },
  });
};

export const useRunGroupJobsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response: IApiResponse<any> = await runJob({ id, mode: 'group' });

      if (!response.success) {
        throw new Error(response.error || "Failed to run group jobs");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
    },
    onError: (error) => {
      console.error("Error running group jobs:", error);
    },
  });
};

export const useRunAllJobsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const response: IApiResponse<any> = await runJob({ mode: 'all' });

      if (!response.success) {
        throw new Error(response.error || "Failed to run all jobs");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getServicesQueryKey() });
    },
    onError: (error) => {
      console.error("Error running all jobs:", error);
    },
  });
};