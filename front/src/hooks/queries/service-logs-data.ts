import { useQuery } from "@tanstack/react-query";
import { IServiceOutputDTO } from "@/interfaces/IServiceList";

// Função de busca simulada
const fetchServiceById = async (serviceId: string): Promise<IServiceOutputDTO> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        service_id: serviceId,
        service_name: `service-${serviceId}`,
        service_url: `http://localhost:300${serviceId}`,
        group_id: `group-id-${serviceId}`,
        job_id: `job-id-${serviceId}`,
        last_run: "2024-01-15T10:30:00Z",
        rate_limit_tolerance: 100,
        service_description: `Sample service ${serviceId} description`,
        created_at: "2024-01-01T00:00:00Z",
        created_by: "admin",
    };
};

export const useServiceDetailQuery = (serviceId: string) => {
    return useQuery<IServiceOutputDTO>({
        queryKey: ['serviceDetail', serviceId],
        queryFn: () => fetchServiceById(serviceId),
        enabled: !!serviceId, // A query só roda se tiver o ID
    });
};