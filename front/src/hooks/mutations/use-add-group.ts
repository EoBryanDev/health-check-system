import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IGroupInputDTO, IGroupOutputDTO } from "@/interfaces/IConfigurations";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { addGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "../queries/use-group-data";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation<IGroupOutputDTO, Error, IGroupInputDTO>({
        mutationFn: async (newGroupData) => {
            const response: IApiResponse<IGroupOutputDTO> = await addGroup(newGroupData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGroupsQueryKey() });
        },
        onError: (error) => {
            console.error("Error creating group:", error);
        },
    });
};