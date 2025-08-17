import { IUser } from "../../domain/entities/interfaces/IUser";
import { IUserRepository } from "../../domain/entities/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";
import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../dto/ICreateUserDTO";


class InMemoryRepository implements IUserRepository {

    readonly users: User[] = [];

    async findByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null> {

        const user = this.users.find(user => user.getUserInfo().email! === email) || null

        if (!user) {
            return null;
        }

        const user_info = user.getUserInfo()

        const user_dto: ICreateUserOutputWPwdDTO = {
            user_id: user_info.user_id!,
            first_name: user_info.first_name!,
            last_name: user_info.last_name!,
            email: user_info.email!,
            created_at: user_info.created_at!,
            role: user_info.role!,
            password: user_info.password!
        }
        return user_dto;
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

    async create(user: User): Promise<ICreateUserOutputDTO> {

        const last_user = this.users.findLast((user) => user.getUserInfo().user_id !== undefined);
        const new_id = last_user ? last_user.getUserInfo().user_id + 'a' : 'a'

        const payload_user = user.getUserInfo()

        const new_user_payload: IUser = {
            user_id: new_id,
            first_name: payload_user.first_name,
            last_name: payload_user.last_name,
            email: payload_user.email,
            password: payload_user.password,
            cellnumber: payload_user.cellnumber
        }

        const createdUser = new User(new_user_payload)

        this.users.push(createdUser);

        const user_info = createdUser.getUserInfo()

        const user_dto: ICreateUserOutputDTO = {
            user_id: user_info.user_id!,
            first_name: user_info.first_name!,
            last_name: user_info.last_name!,
            email: user_info.email!,
            created_at: user_info.created_at!,
        }
        return user_dto;
    }

    // async delete(id: string): Promise<void> {

    //     const index = this.users.findIndex(user => user.getUserInfo().user_id! === id);
    //     if (index !== -1) {
    //         this.users.splice(index, 1);
    //     }

    // }

    async findAll(): Promise<ICreateUserOutputDTO[]> {

        const all_users: ICreateUserOutputDTO[] = this.users.map((user) => {
            const user_info = user.getUserInfo();

            return {
                user_id: user_info.user_id!,
                first_name: user_info.first_name!,
                last_name: user_info.last_name!,
                email: user_info.email!,
                created_at: user_info.created_at!,
            }
        })

        return all_users;
    }

}

export { InMemoryRepository };
