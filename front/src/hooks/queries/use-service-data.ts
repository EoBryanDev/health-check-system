import { IService } from "@/interfaces/IConfigurations";
import { useQuery } from "@tanstack/react-query";

const getServicesMock = async (): Promise<IService[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return [
        {
            service_id: "1",
            name: "service-1",
            url: "http://localhost:3000",
            group_id: "group-id-1",
            group: "group1",
            job_id: "job-id-1",
            job_name: "job1",
            last_run: null,
            rate_limit_tolerance: 100,
            description: "First sample service",
        },
        {
            service_id: "2",
            name: "service-2",
            url: "http://localhost:3001",
            group_id: "group-id-2",
            group: "group2",
            job_id: "job-id-2",
            job_name: "job2",
            last_run: new Date(),
            rate_limit_tolerance: 200,
            description: "Second sample service",
        },
    ];
};

export const getServicesQueryKey = () => ["services"] as const;
export function useServicesQuery() {
    return useQuery<IService[]>({
        queryKey: getServicesQueryKey(),
        queryFn: getServicesMock
    });
}