// src/hooks/mutations/use-remove-job-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeJob } from "@/services/job.service";
import { getJobsQueryKey } from "../queries/use-job-data";

export const useRemoveJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (jobId) => {
      await removeJob(jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
    },
    onError: (error) => {
      console.error("Error removing job:", error);
    },
  });
};