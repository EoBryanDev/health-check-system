import { CreateUserUseCase } from '../../../domain/use_cases/CreateUserUseCase';
import { Request, Response } from 'express';
import { IHTTPSuccessOutputDTO } from '../../dto/IHTTPOutputDTO';
import { createUserSchema } from '../zodSchemas/user.post';

class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, resp: Response) {
    const { body } = req;

    const valid_body = createUserSchema.parse(body);

    const response = await this.createUserUseCase.execute(valid_body);

    const outputSuccessDTO: IHTTPSuccessOutputDTO = {
      data: response,
    };

    resp.status(200).json(outputSuccessDTO);
  }

  // async findUser(req: Request, resp: Response) {
  //     const { params } = req

  //     const response = await this.findUser.execute(params)

  //     const outputSuccessDTO: IHTTPSuccessOutputDTO = {
  //         data: response
  //     }

  //     resp.status(200).json(outputSuccessDTO)

  // }

  // async findAllUsers(req: Request, resp: Response) {

  //     const outputSuccessDTO: IHTTPSuccessOutputDTO = {
  //         data: response
  //     }

  //     resp.status(200).json(outputSuccessDTO)
  // }
}

export { UserController };
