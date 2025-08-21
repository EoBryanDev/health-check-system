import { CreateUserUseCase } from "../../../domain/use_cases/CreateUserUseCase";
import { Request, Response } from "express";
import { IHTTPSuccessOutputDTO } from "../../dto/IHTTPOutputDTO";
import { LoginUseCase } from "../../../domain/use_cases/LoginUseCase";
import { LoginUserSchema } from "../zodSchemas/login.post";

class LoginController {
    constructor(private loginUseCase: LoginUseCase) { }

    async login(req: Request, resp: Response) {

        const { body } = req

        const valid_body = LoginUserSchema.parse(body)

        const response = await this.loginUseCase.execute(valid_body)

        const outputSuccessDTO: IHTTPSuccessOutputDTO = {
            data: response
        }

        resp.status(200).json()
    }


}

export { LoginController }