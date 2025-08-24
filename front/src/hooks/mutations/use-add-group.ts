import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroupsQueryKey } from "@/hooks/queries/use-group-data";
import { IGroupInputDTO } from "@/interfaces/IConfigurations";
import { addGroup } from "@/services/group.service";

// O tipo de 'mutationFn' agora é 'IGroupInputDTO'
export function useAddGroupMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: IGroupInputDTO) => addGroup(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGroupsQueryKey() });
        },
    });
}