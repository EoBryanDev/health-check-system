
interface IRepository {
    findUserByEmail(email: string): Promise<any | null>;

    // findById(id: string): Promise<User | null>;

    // update(user: User): Promise<void>;

    createUser(user: any): Promise<any>;

    // delete(id: string): Promise<void>;

    findAllUsers(): Promise<any[]>;
}

export { IRepository };
