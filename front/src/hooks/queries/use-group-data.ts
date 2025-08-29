import { useQuery } from "@tanstack/react-query";
import { IGroupOutputDTO } from "@/interfaces/IConfigurations";
import { getAllGroups } from "@/services/group.service";
import { IApiResponse } from "@/interfaces/IApiResponse";

export const getGroupsQueryKey = () => ["groups"] as const;

export const useGroupsQuery = () => {
    return useQuery<IGroupOutputDTO[] | null, Error>({
        queryKey: getGroupsQueryKey(),
        queryFn: async () => {
            const response: IApiResponse<IGroupOutputDTO[] | null> = await getAllGroups();

            if (response) {
                return response.data;
            }

            return null;
        },
    });
};