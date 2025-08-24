// src/hooks/queries/use-dashboard-data.ts
import { useQuery } from "@tanstack/react-query";
import type { DashboardStats, JobStats, GroupStats, VolumetryData } from "@/interfaces/IDashboard";
import { getAllJobs } from "@/services/job.service";
import { getAllGroups } from "@/services/group.service";
import { getAllServices } from "@/services/service.service";
import { IJobOutputDTO, IGroupOutputDTO } from "@/interfaces/IConfigurations";
import { IServiceOutputDTO } from "@/interfaces/IService";
import { IApiResponse } from "@/interfaces/IApiResponse";

async function fetchDashboardData(): Promise<{
    stats: DashboardStats;
    jobs: JobStats;
    groups: GroupStats;
    volumetry: VolumetryData[];
}> {
    try {
        const [jobsResponse, groupsResponse, servicesResponse]: [
            IApiResponse<IJobOutputDTO[] | null>,
            IApiResponse<IGroupOutputDTO[] | null>,
            IApiResponse<IServiceOutputDTO[] | null>
        ] = await Promise.all([getAllJobs(), getAllGroups(), getAllServices()]);

        const jobsData = jobsResponse.data ?? [];
        const groupsData = groupsResponse.data ?? [];
        const servicesData = servicesResponse.data ?? [];

        // ---- Estatísticas de jobs ----
        // const activeJobs = jobsData.filter((job) => job.active).length;
        // const successJobs = jobsData.filter((job) => job.status === "success").length;
        // const warningJobs = jobsData.filter((job) => job.status === "warning").length;
        // const errorJobs = jobsData.filter((job) => job.status === "error").length;

        // ---- Estatísticas de grupos ----
        const totalGroups = groupsData.length;
        const totalUsers = 0; // placeholder até backend mandar

        // ---- Estatísticas de serviços ----
        const servicesCreated = servicesData.length;
        // const servicesActiveCreated = servicesData.filter((service) => service.active).length;

        // ---- Volumetria (mock) ----
        const volumetry: VolumetryData[] = Array.from({ length: 12 }, (_, i) => ({
            timestamp: `${i * 2}:00`,
            volume: Math.floor(Math.random() * 100) + 20,
        }));

        return {
            stats: {
                systemUptime: "99.8%",
                averageServiceInterval: "1.9s",
                servicesCreated,
                servicesActiveCreated: 0,
            },
            jobs: {
                activeJobs: 0,
                successJobs: 0,
                warningJobs: 0,
                errorJobs: 0,
            },
            groups: {
                totalGroups,
                totalUsers,
            },
            volumetry,
        };
    } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        throw error;
    }
}

export const getDashboardDataQueryKey = () => ["dashboardData"] as const;

export function useDashboardData() {
    const { data, isLoading, error } = useQuery({
        queryKey: getDashboardDataQueryKey(),
        queryFn: fetchDashboardData,
        // refetchInterval: 30000, // atualiza a cada 30s
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
