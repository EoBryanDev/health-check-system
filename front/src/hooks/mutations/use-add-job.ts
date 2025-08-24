import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobsQueryKey } from "@/hooks/queries/use-job-data";
import { IJobInputDTO } from "@/interfaces/IConfigurations";
import { addJob } from "@/services/job.service";

// O tipo de 'mutationFn' agora é 'IJobInputDTO'
export function useAddJobMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: IJobInputDTO) => addJob(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
        },
    });
}