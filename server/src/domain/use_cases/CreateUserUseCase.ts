
import { ICreateUserInputDTO, ICreateUserOutputDTO } from "../../infrastructure/dto/ICreateUserDTO";
import { IUserRepository } from "../entities/interfaces/IUserRepository";
import { User } from "../entities/User";

class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(user_payload: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
        const user = await User.create(user_payload);
        const user_info = user.getUserInfo();

        const already_exist_user = await this.userRepository.findByEmail(user_info.email);

        if (already_exist_user) {
            throw new Error("User email already registered!");
        }

        const response = await this.userRepository.create(user)

        return response
    }
}

export { CreateUserUseCase }