import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { updateGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "../queries/use-group-data";
import { IGroupInputDTO, IGroupOutputUsersDTO } from "@/interfaces/IGroup";

export const useEditGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IGroupOutputUsersDTO, Error, IGroupInputDTO>({
    mutationFn: async (groupData: IGroupInputDTO) => {
      if (!groupData.group_id) {
        throw new Error("Group ID is required for editing.");
      }

      const response: IApiResponse<IGroupOutputUsersDTO> = await updateGroup(groupData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGroupsQueryKey() });
    },
    onError: (error) => {
      console.error("Error updating group:", error);
    },
  });
};