// src/hooks/mutations/use-run-job.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRunJobInputDTO } from "@/interfaces/IJob";
import { runJob } from "@/services/job.service";
import { getJobsQueryKey } from "../queries/use-job-data";
import { getServicesQueryKey } from "../queries/use-service-data";
import { IApiResponse } from "@/interfaces/IApiResponse";

export const useRunJobMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, IRunJobInputDTO>({
        mutationFn: async (data) => {
            const response: IApiResponse<any> = await runJob(data);

            if (!response.success) {
                throw new Error(response.error || "Failed to run job");
            }

            // como o runJob não tem retorno útil, só finalizamos aqui
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
