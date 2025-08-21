
import { ICreateUserInputDTO, ICreateUserOutputDTO } from "../../infrastructure/dto/ICreateUserDTO";
import { IHashPassword } from "../entities/interfaces/IHashPassword";
import { IRepository } from "../entities/interfaces/IRepository";
import { User } from "../entities/User";

class CreateUserUseCase {
    constructor(private dbRepository: IRepository, private hashService: IHashPassword) { }

    async execute(user_payload: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
        const user = new User(user_payload);
        const user_info = user.getUserInfo();
        const hashPwd = await this.hashService.hash(user_info.password)

        const userhashedPwd = {
            ...user_info,
            password: hashPwd
        }

        const already_exist_user = await this.dbRepository.findUserByEmail(user_info.email);

        if (already_exist_user) {
            throw new Error("User email already registered!");
        }

        const response = await this.dbRepository.createUser(new User(userhashedPwd))

        return response
    }
}

export { CreateUserUseCase }