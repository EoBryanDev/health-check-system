
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "@/services/job.service";
import { getJobsQueryKey } from "../queries/use-job-data";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IJobInputDTO, IJobOutputDTO } from "@/interfaces/IJob";

export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation<IJobOutputDTO, Error, IJobInputDTO>({
        mutationFn: async (jobData) => {
            const response: IApiResponse<IJobOutputDTO> = await createJob(jobData);

            console.log(response);

            if (!response.success) {
                throw new Error(response.error || "Failed to create job");
            }

            return response.data as IJobOutputDTO;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
        },
        onError: (error) => {
            console.error("Error creating job:", error);
        },
    });
};
