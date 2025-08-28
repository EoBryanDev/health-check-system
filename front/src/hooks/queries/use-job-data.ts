// src/hooks/queries/use-job-data.ts
import { useQuery } from "@tanstack/react-query";
import { IJobOutputDTO } from "@/interfaces/IConfigurations";
import { getAllJobs } from "@/services/job.service";

export const getJobsQueryKey = () => ["jobs"] as const;

export const useJobsQuery = () => {
    return useQuery<IJobOutputDTO[] | null, Error>({
        queryKey: getJobsQueryKey(),
        queryFn: async () => {
            const response = await getAllJobs();

            if (response) {
                return response.data;
            }

            return null;
        },
    });
};
