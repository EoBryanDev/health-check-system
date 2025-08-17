import { IRepository } from "../../domain/entities/interfaces/IRepository";
import { IGroupOutputDTO, IGroupOutputUsersDTO } from "../dto/IGroupDTO";


class InMemoryRepository implements IRepository {

    readonly users: any[] = [];
    readonly groups: any[] = [];

    async findUserByEmail(email: string): Promise<any | null> {

        return null;
    }

    async createUser(user: any): Promise<any> {

        return null;
    }

    // async delete(id: string): Promise<void> {

    //     const index = this.users.findIndex(user => user.getUserInfo().user_id! === id);
    //     if (index !== -1) {
    //         this.users.splice(index, 1);
    //     }

    // }

    async findAllUsers(): Promise<any[]> {
        return [];
    }

    async createGroup(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAllGroups(): Promise<IGroupOutputDTO[] | null> {
        throw new Error("Method not implemented.");
    }
    async findGroupById(group_id: string): Promise<IGroupOutputDTO | null> {
        throw new Error("Method not implemented.");
    }
    async findGroupMembersById(user_id: string): Promise<IGroupOutputUsersDTO[] | null> {
        throw new Error("Method not implemented.");
    }
    // async inativeGroup(group_id: string): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }
}

export { InMemoryRepository };
