import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IGroup, TAnyConfigItem } from "@/interfaces/IConfigurations";

const getGroupsMock = async (): Promise<IGroup[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return [
        { group_id: "1", name: "group1", user: "user1" },
        { group_id: "2", name: "group2", user: "user2" },
    ];
};

export const getGroupsQueryKey = () => ["groups"] as const;

export function useGroupsQuery() {
    return useQuery<IGroup[]>({
        queryKey: getGroupsQueryKey(),
        queryFn: getGroupsMock,
    });
}
