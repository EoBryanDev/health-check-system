import { User } from "../User";


interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;

    // findById(id: string): Promise<User | null>;

    // update(user: User): Promise<void>;

    create(user: User): Promise<User>;

    // delete(id: string): Promise<void>;

    findAll(): Promise<User[]>;
}

export { IUserRepository };
