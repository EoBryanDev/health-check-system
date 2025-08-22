import { Request, Response } from "express";
import { IHTTPErrorOutputDTO, IHTTPSuccessOutputDTO } from "../../dto/IHTTPOutputDTO";
import { LoginUseCase } from "../../../domain/use_cases/LoginUseCase";
import { LoginUserSchema } from "../zodSchemas/login.post";

class LoginController {
    constructor(private loginUseCase: LoginUseCase) { }

    async login(req: Request, resp: Response) {
        try {

            const { body } = req

            const valid_body = LoginUserSchema.parse(body)

            const response = await this.loginUseCase.execute(valid_body)

            const outputSuccessDTO: IHTTPSuccessOutputDTO = {
                data: response
            }

            resp.status(200).json(outputSuccessDTO)
        } catch (error) {
            if (error instanceof Error) {
                const resp_error: IHTTPErrorOutputDTO = {
                    error: error.message
                }
                resp.status(400).json(resp_error)

            }
            resp.status(500).json(error)
        }
    }


}

export { LoginController }