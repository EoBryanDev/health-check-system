import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { addGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "../queries/use-group-data";
import { IGroupInputDTO, IGroupOutputUsersDTO } from "@/interfaces/IGroup";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation<IGroupOutputUsersDTO, Error, IGroupInputDTO>({
        mutationFn: async (newGroupData) => {
            const response: IApiResponse<IGroupOutputUsersDTO> = await addGroup(newGroupData);
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