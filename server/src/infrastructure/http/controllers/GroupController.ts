import { Request, Response } from 'express';
import {
  IHTTPErrorOutputDTO,
  IHTTPSuccessOutputDTO,
} from '../../dto/IHTTPOutputDTO';
import { CreateMonitGroupUseCase } from '../../../domain/use_cases/CreateMonitGroupUseCase';
import { createGroupSchema } from '../zodSchemas/group.post';
import { GetAllGroupsUseCase } from '../../../domain/use_cases/GetAllGroupsUseCase';
import { IQueryParams } from '../../../domain/use_cases/interfaces/IQueryParams';

class GroupController {
  constructor(
    private createMonitGroupUseCase: CreateMonitGroupUseCase,
    private getAllGroupsUseCase: GetAllGroupsUseCase
  ) {}

  async createGroup(req: Request, resp: Response) {
    try {
      const { body } = req;
      const { user_id, role } = req.user!;

      const valid_body = createGroupSchema.parse(body);

      const response = await this.createMonitGroupUseCase.execute(valid_body, {
        user_id,
        role,
      });

      const outputSuccessDTO: IHTTPSuccessOutputDTO = {
        data: response,
      };

      resp.status(200).json(outputSuccessDTO);
    } catch (error) {
      if (error instanceof Error) {
        const resp_error: IHTTPErrorOutputDTO = {
          error: error.message,
        };
        resp.status(400).json(resp_error);
      } else {
        resp.status(500).json(error);
      }
    }
  }

  async findAllGroups(req: Request, resp: Response) {
    try {
      const { user_id, role } = req.user!;

      const params: IQueryParams = {
        active: undefined,
        offset: 0, // non implemented yey
        limit: 0, // non implemented yey
      }; // in the future i'll get it from req.params

      const response = await this.getAllGroupsUseCase.execute(
        { user_id, role },
        params
      );

      const outputSuccessDTO: IHTTPSuccessOutputDTO = {
        data: response,
      };

      resp.status(200).json(outputSuccessDTO);
    } catch (error) {
      if (error instanceof Error) {
        const resp_error: IHTTPErrorOutputDTO = {
          error: error.message,
        };
        resp.status(400).json(resp_error);
      } else {
        resp.status(500).json(error);
      }
    }
  }
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

export { GroupController };
