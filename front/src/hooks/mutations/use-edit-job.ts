import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJobInputDTO, IJobOutputDTO } from "@/interfaces/IJob";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { getJobsQueryKey } from "../queries/use-job-data";
import { updateJob } from "@/services/job.service";

export const useEditJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IJobOutputDTO, Error, IJobInputDTO>({
    mutationFn: async (jobData: IJobInputDTO) => {
      if (!jobData.job_id) {
        throw new Error("Job ID is required for editing.");
      }

      const response: IApiResponse<IJobOutputDTO> = await updateJob(jobData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });
    },
    onError: (error) => {
      console.error("Error updating Job:", error);
    },
  });
};