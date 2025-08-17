import { CreateUserInputDTO, CreateUserOutputDTO } from "../../infrastructure/dto/CreateUserDTO";
import { IUserRepository } from "../entities/interfaces/IUserRepository";
import { User } from "../entities/User";

class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    // async execute(user_payload: CreateUserInputDTO): Promise<CreateUserOutputDTO> {

    //     return
    // }
}

export { CreateUserUseCase }