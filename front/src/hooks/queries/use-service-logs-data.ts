import { useQuery } from "@tanstack/react-query";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";

// Função de busca simulada
const fetchServiceLogs = async (serviceId: string): Promise<IServiceLogOutputDTO[]> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        {
            service_log_id: "log-1",
            service_id: serviceId,
            start_at: "2024-01-15T10:30:00Z",
            duration: 1250,
            method: "GET",
            status_code: 200,
            requester: "system",
            device: "server-01",
            classification: "success",
        },
        {
            service_log_id: "log-2",
            service_id: serviceId,
            start_at: "2024-01-15T10:25:00Z",
            duration: 2100,
            method: "POST",
            status_code: 201,
            requester: "user-123",
            device: "mobile-app",
            classification: "success",
        },
        {
            service_log_id: "log-3",
            service_id: serviceId,
            start_at: "2024-01-15T10:20:00Z",
            duration: 5000,
            method: "GET",
            status_code: 500,
            requester: "system",
            device: "server-02",
            classification: "error",
        },
    ];
};

export const useServiceLogsQuery = (serviceId: string) => {
    return useQuery<IServiceLogOutputDTO[]>({
        queryKey: ['serviceLogs', serviceId],
        queryFn: () => fetchServiceLogs(serviceId),
        enabled: !!serviceId,
    });
};