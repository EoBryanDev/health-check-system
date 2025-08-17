import { IUserRepository } from "../../domain/entities/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";


class InMemoryUserRepository implements IUserRepository {

    readonly users: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.getUserInfo().email! === email) || null;
    }

    // async findById(id: string): Promise<User | null> {
    //     return this.users.find(user => user.props.id === id) || null;
    // }

    // async update(user: User): Promise<void> {
    //     const index = this.users.findIndex(u => u.getUserInfo().user_id! === user.getUserInfo().user_id!);
    //     if (index !== -1) {
    //         this.users[index] = user;
    //     }
    // }

    async create(user: User): Promise<User> {

        const createdUser = await User.create(user.getUserInfo())

        this.users.push(createdUser);

        return createdUser;
    }

    // async delete(id: string): Promise<void> {

    //     const index = this.users.findIndex(user => user.getUserInfo().user_id! === id);
    //     if (index !== -1) {
    //         this.users.splice(index, 1);
    //     }

    // }

    async findAll(): Promise<User[]> {
        return this.users;
    }

}

export { InMemoryUserRepository };
