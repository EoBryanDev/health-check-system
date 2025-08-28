import { fetchDashboardData } from "@/helpers/fetchDashboardData";
import { useQuery } from "@tanstack/react-query";

export const getDashboardDataQueryKey = () => ["dashboardData"] as const;

export function useDashboardData() {
    const { data, isLoading, error } = useQuery({
        queryKey: getDashboardDataQueryKey(),
        queryFn: fetchDashboardData,
    });

    return {
        dashboardStats: data?.stats,
        jobStats: data?.jobs,
        groupStats: data?.groups,
        volumetryData: data?.volumetry,
        loading: isLoading,
        error,
    };
}