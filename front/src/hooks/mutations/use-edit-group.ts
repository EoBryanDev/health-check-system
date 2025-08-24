import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGroup } from "@/services/group.service";
import { getGroupsQueryKey } from "@/hooks/queries/use-group-data";
import { IGroup } from "@/interfaces/IConfigurations";

export function useEditGroupMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: IGroup) => editGroup(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGroupsQueryKey() });
        },
    });
}
