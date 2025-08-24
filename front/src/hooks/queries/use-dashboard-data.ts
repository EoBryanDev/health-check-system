import { useQuery } from "@tanstack/react-query"
import type { DashboardStats, JobStats, GroupStats, VolumetryData } from "@/interfaces/IDashboard"

async function fetchDashboardData() {
    // Exemplo de chamada para API real
    // const response = await fetch('/api/dashboard')
    // return await response.json()

    // Simulando dados da API
    return {
        stats: {
            systemUptime: "99.8%",
            averageServiceInterval: "1.9s",
            servicesCreated: 1350,
            servicesActiveCreated: 945,
        },
        jobs: {
            activeJobs: 18,
            successJobs: 1298,
            warningJobs: 31,
            errorJobs: 7,
        },
        groups: {
            totalGroups: 12,
            totalUsers: 189,
        },
        volumetry: Array.from({ length: 12 }, (_, i) => ({
            timestamp: `${i * 2}:00`,
            volume: Math.floor(Math.random() * 100) + 20,
        })),
    }
}

export function useDashboardData() {
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["dashboardData"],
        queryFn: fetchDashboardData,
        refetchInterval: 30000, // 30 segundos
    })

    return {
        dashboardStats: data?.stats as DashboardStats,
        jobStats: data?.jobs as JobStats,
        groupStats: data?.groups as GroupStats,
        volumetryData: data?.volumetry as VolumetryData[],
        loading: isLoading,
    }
}