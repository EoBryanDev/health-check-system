import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { ILoginInputDTO, ILoginOutputDTO } from "../../infrastructure/dto/ILoginDTO";
import { IHashPassword } from "../entities/interfaces/IHashPassword";
import { ITokenGenerator } from "../entities/interfaces/ITokenGenerator";
import { IUserRepository } from "../entities/interfaces/IUserRepository";
import { parseERoleTRole } from "../helpers/parseERoleTRole";
import { parseSecondsToIsoString } from "../helpers/parseSecondsToIsoString";

class LoginUseCase {
    constructor(private userRepository: IUserRepository, private hashService: IHashPassword, private tokenService: ITokenGenerator) { }

    async execute(login_payload: ILoginInputDTO): Promise<ILoginOutputDTO> {
        const dbUser = await this.userRepository.findByEmail(login_payload.email)

        if (!dbUser) {
            throw new Error("E-mail/Password is incorrect!");
        }

        const userPasswordCompare = await this.hashService.compare(login_payload.password, dbUser.password);

        if (!userPasswordCompare) {
            throw new Error("E-mail/Password is incorrect!");
        }

        const token_payload: IDataInToken = {
            role: parseERoleTRole(dbUser.role),
            user_id: dbUser.user_id
        }

        const { access_token, expiresIn } = this.tokenService.generate(token_payload);

        const response: ILoginOutputDTO = {
            access_token,
            expires_in: expiresIn,
            expires_at: parseSecondsToIsoString(expiresIn)
        }

        return response;
    }
}

export { LoginUseCase }