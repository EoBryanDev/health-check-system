import { Request, Response } from 'express';
import { CreateServiceUseCase } from '../../../domain/use_cases/CreateServiceUseCase';
import { GetAllServicesUseCase } from '../../../domain/use_cases/GetAllServicesUseCase';
import { GetServiceById } from '../../../domain/use_cases/GetServiceById';
import { createServiceSchema } from '../zodSchemas/service.post.schema';
import {
  IHTTPErrorOutputDTO,
  IHTTPSuccessOutputDTO,
} from '../../dto/IHTTPOutputDTO';
import { IQueryParams } from '../../../domain/use_cases/interfaces/IQueryParams';
import { IServiceInputDTO } from '../../dto/IServiceDTO';
import { EditServiceUseCase } from '../../../domain/use_cases/EditServiceUseCase';
import { DeleteServiceUseCase } from '../../../domain/use_cases/DeleteServiceUseCase';
import { editServiceSchema } from '../zodSchemas/service.put.schema';
import { GetAllServiceLogByServiceIdUseCase } from '../../../domain/use_cases/GetAllServiceLogByServiceIdUseCase';
import { queryParams } from '../../../domain/helpers/queryParams';
import { RunServiceByIdUseCase } from '../../../domain/use_cases/RunServiceByIdUseCase';

class ServiceController {
  constructor(
    private createServiceUseCase: CreateServiceUseCase,
    private getAllServicesUseCase: GetAllServicesUseCase,
    private getServiceById: GetServiceById,
    private editServiceUseCase: EditServiceUseCase,
    private deleteServiceUseCase: DeleteServiceUseCase,
    private getAllServiceLogByServiceIdUseCase: GetAllServiceLogByServiceIdUseCase,
    private runServiceByIdUseCase: RunServiceByIdUseCase
  ) { }

  async createService(req: Request, resp: Response) {
    try {
      const { user_id, role } = req.user!;
      const { body } = req;

      const valid_body = createServiceSchema.parse(body);

      const serviceInput: IServiceInputDTO = {
        ...valid_body,
        last_run: valid_body.last_run ?? null, // or new Date() if you want to set current time
      };
      const response = await this.createServiceUseCase.execute(serviceInput, {
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

  async editService(req: Request, resp: Response) {
    try {
      const { user_id, role } = req.user!;
      const { body } = req;

      const date = typeof body.last_run === 'string' ? new Date(body.last_run) : typeof body.last_run === 'undefined' ? null : body.last_run
      const valid_body = editServiceSchema.parse({ ...body, job_id: body.job_id === '' ? undefined : body.job_id, last_run: date });

      const response = await this.editServiceUseCase.execute(valid_body, {
        user_id,
        role,
      });

      const outputSuccessDTO: IHTTPSuccessOutputDTO = {
        data: response,
      };

      resp.status(200).json(outputSuccessDTO);
    } catch (error) {
      console.log(error);

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

  async findAllServices(_req: Request, resp: Response) {
    try {
      // const { user_id, role } = req.user!

      const params: IQueryParams = {
        active: true,
        offset: 0,
        limit: 0,
      };

      const response = await this.getAllServicesUseCase.execute(params);
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

  async findServiceById(req: Request, resp: Response) {
    try {
      // const { user_id, role } = req.user!
      const { id } = req.params;

      const response = await this.getServiceById.execute(id);

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

  async findServiceLogsById(req: Request, resp: Response) {
    try {
      // const { user_id, role } = req.user!
      const { id } = req.params;
      const { offset, limit } = req.query;


      const params = queryParams({ active: true, offset: parseInt(offset as string, 10), limit: parseInt(limit as string, 10) })
      const response = await this.getAllServiceLogByServiceIdUseCase.execute(id, params);

      const outputSuccessDTO: IHTTPSuccessOutputDTO = {
        data: response,
        offset: params.offset,
        limit: params.limit,
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

  async runServiceById(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const { user_id, role } = req.user!
      const response = await this.runServiceByIdUseCase.execute(id, { user_id, role });

      const outputSuccessDTO: IHTTPSuccessOutputDTO = {
        data: response,
      };

      resp.status(204).json(outputSuccessDTO);
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

  async deleteService(req: Request, resp: Response) {
    try {
      const { id } = req.params

      await this.deleteServiceUseCase.execute(id)

      const outputSuccessDTO: IHTTPSuccessOutputDTO = {
        data: null
      }

      resp.status(204).json(outputSuccessDTO)
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

export { ServiceController };
