import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeJob } from "@/services/job.service";
import { getJobsQueryKey } from "@/hooks/queries/use-job-data";

export function useRemoveJobMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => removeJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
        },
    });
}