import { IGroupOutputDTO, IGroupOutputUsersDTO } from "../../../infrastructure/dto/IGroupDTO";

interface IRepository {
    findUserByEmail(email: string): Promise<any | null>;

    // findById(id: string): Promise<User | null>;

    // update(user: User): Promise<void>;

    createUser(user: any): Promise<any>;

    // delete(id: string): Promise<void>;

    findAllUsers(): Promise<any[]>;

    createGroup(): Promise<void>;

    findAllGroups(): Promise<IGroupOutputDTO[] | null>;

    findGroupById(group_id: string): Promise<IGroupOutputDTO | null>;

    findGroupMembersById(user_id: string): Promise<IGroupOutputUsersDTO[] | null>;

    // inativeGroup(group_id: string): Promise<void>;


}

export { IRepository };
