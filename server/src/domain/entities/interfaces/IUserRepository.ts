import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../../../infrastructure/dto/ICreateUserDTO";
import { User } from "../User";


interface IUserRepository {
    findByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null>;

    // findById(id: string): Promise<User | null>;

    // update(user: User): Promise<void>;

    create(user: User): Promise<ICreateUserOutputDTO>;

    // delete(id: string): Promise<void>;

    findAll(): Promise<ICreateUserOutputDTO[]>;
}

export { IUserRepository };
