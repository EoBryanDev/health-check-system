import { IGroup, IGroupInputDTO } from "@/interfaces/IConfigurations";

export const addGroup = async (item: IGroupInputDTO): Promise<IGroup> => {

    const newGroup: IGroup = {
        group_id: Date.now().toString(),
        name: item.group_name,
        user: item.users_email,
    };
    return new Promise((resolve) => setTimeout(() => resolve(newGroup), 500));
};

export const removeGroup = async (id: string): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve(id), 500));
};

export const editGroup = async (item: IGroup): Promise<IGroup> => {
    return new Promise((resolve) => setTimeout(() => resolve(item), 500));
};