
import { ICreateUserInputDTO, ICreateUserOutputDTO } from "../../infrastructure/dto/ICreateUserDTO";
import { IHashPassword } from "../entities/interfaces/IHashPassword";
import { IUserRepository } from "../entities/interfaces/IUserRepository";
import { User } from "../entities/User";

class CreateUserUseCase {
    constructor(private userRepository: IUserRepository, private hashService: IHashPassword) { }

    async execute(user_payload: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
        const user = new User(user_payload);
        const user_info = user.getUserInfo();
        const hashPwd = await this.hashService.hash(user_info.password)

        const userhashedPwd = {
            ...user_info,
            password: hashPwd
        }

        const already_exist_user = await this.userRepository.findByEmail(user_info.email);

        if (already_exist_user) {
            throw new Error("User email already registered!");
        }

        const response = await this.userRepository.create(new User(userhashedPwd))

        return response
    }
}

export { CreateUserUseCase }