import { useQuery } from "@tanstack/react-query";
import { IServiceOutputDTO } from "@/interfaces/IService";
import { getAllServices } from "@/services/service.service";
import { IApiResponse } from "@/interfaces/IApiResponse";

export const getServicesQueryKey = () => ["services"] as const;

export const useServicesQuery = () => {
    return useQuery<IServiceOutputDTO[] | null, Error>({
        queryKey: getServicesQueryKey(),
        queryFn: async () => {
            const response: IApiResponse<IServiceOutputDTO[] | null> = await getAllServices();
            if (response) {
                return response.data;
            }
            return null;
        },
    });
};