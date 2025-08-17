import { IRepository } from "../../domain/entities/interfaces/IRepository";


class InMemoryRepository implements IRepository {

    readonly users: any[] = [];

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

}

export { InMemoryRepository };
