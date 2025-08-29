// src/hooks/mutations/use-remove-group-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "../queries/use-group-data";

export const useRemoveGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (groupId) => {
      await removeGroup(groupId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGroupsQueryKey() });
    },
    onError: (error) => {
      console.error("Error removing group:", error);
    },
  });
};