import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "@/hooks/queries/use-group-data";

export function useRemoveGroupMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => removeGroup(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGroupsQueryKey() });
        },
    });
}