import { useQuery } from "@tanstack/react-query";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";
import { getAllServicesLogsById } from "@/services/service_log.service";
import { IApiResponse } from "@/interfaces/IApiResponse";

export const getServicesLogQueryKey = (service_id: string, offset: number, limit: number) =>
    [`service-log-${service_id}`, offset, limit] as const;

export const useServiceLogsQuery = (serviceId: string, offset: number, limit: number) => {
    return useQuery<IApiResponse<IServiceLogOutputDTO[] | null>>({
        queryKey: getServicesLogQueryKey(serviceId, offset, limit),
        queryFn: () => getAllServicesLogsById({ service_id: serviceId, offset, limit }),
        enabled: !!serviceId,
    });
};