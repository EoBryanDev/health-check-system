import type { IDashboardStats, IJobStats, IGroupStats, IVolumetryData } from "@/interfaces/IDashboard";
import { getAllJobs } from "@/services/job.service";
import { getAllGroups } from "@/services/group.service";
import { getAllServices } from "@/services/service.service";
import { IJobOutputDTO, IGroupOutputDTO } from "@/interfaces/IConfigurations";
import { IServiceOutputDTO } from "@/interfaces/IService";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";
import { getAllServicesLogs } from "@/services/service_log.service";
import { processVolumetryData } from "@/helpers/processVolumetryData";
import { calculateAverageInterval } from "@/helpers/calculateAverageInterval";

async function fetchDashboardData(): Promise<{
    stats: IDashboardStats;
    jobs: IJobStats;
    groups: IGroupStats;
    volumetry: IVolumetryData[];
}> {
    try {

        const [jobsResponse, groupsResponse, servicesResponse, serviceLogsResponse]: [
            IApiResponse<IJobOutputDTO[] | null>,
            IApiResponse<IGroupOutputDTO[] | null>,
            IApiResponse<IServiceOutputDTO[] | null>,
            IApiResponse<IServiceLogOutputDTO[] | null>
        ] = await Promise.all([
            getAllJobs(),
            getAllGroups(),
            getAllServices(),
            getAllServicesLogs({
                offset: 0,
                limit: 500
            })
        ]);

        const jobsData = jobsResponse.data ?? [];
        const groupsData = groupsResponse.data ?? [];
        const servicesData = servicesResponse.data ?? [];
        const serviceLogsData = serviceLogsResponse.data ?? [];


        const activeJobs = jobsData.filter((job) => job.active).length;


        const totalGroups = groupsData.length;
        const totalUsers = 0;


        const servicesCreated = servicesData.length;
        const servicesActiveCreated = servicesData.filter((service) => service.active).length;


        const volumetry = processVolumetryData(serviceLogsData);


        const averageServiceInterval = serviceLogsData.length > 1
            ? calculateAverageInterval(serviceLogsData)
            : "N/A";

        return {
            stats: {
                systemUptime: "99.8%",
                averageServiceInterval,
                servicesCreated,
                servicesActiveCreated,
            },
            jobs: {
                activeJobs,
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

export { fetchDashboardData }