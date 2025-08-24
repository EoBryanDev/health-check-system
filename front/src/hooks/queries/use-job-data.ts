import { IJob } from "@/interfaces/IConfigurations";
import { useQuery } from "@tanstack/react-query";

const getJobsMock = async (): Promise<IJob[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return [
        {
            job_id: "1",
            name: "job1",
            group: "group1",
            group_id: "group-id-1",
            description: "Sample job for group 1",
            interval_time: 5000,
        },
        {
            job_id: "2",
            name: "job2",
            group: "group2",
            group_id: "group-id-2",
            description: "Another sample job for group 2",
            interval_time: 10000,
        },
    ];
};

export const getJobsQueryKey = () => ["jobs"] as const;

export function useJobsQuery() {
    return useQuery<IJob[]>({
        queryKey: getJobsQueryKey(),
        queryFn: getJobsMock,
    });
}