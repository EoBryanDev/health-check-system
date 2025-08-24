import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editJob } from "@/services/job.service";
import { getJobsQueryKey } from "@/hooks/queries/use-job-data";
import { IJob } from "@/interfaces/IConfigurations";

export function useEditJobMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: IJob) => editJob(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
        },
    });
}