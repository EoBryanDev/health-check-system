import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { updateGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "../queries/use-group-data";
import { IGroupInputDTO, IGroupOutputDTO } from "@/interfaces/IGroup";

export const useEditGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IGroupOutputDTO, Error, IGroupInputDTO>({
    mutationFn: async (groupData: IGroupInputDTO) => {
      if (!groupData.group_id) {
        throw new Error("Group ID is required for editing.");
      }
      const response: IApiResponse<IGroupOutputDTO> = await updateGroup(groupData);
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