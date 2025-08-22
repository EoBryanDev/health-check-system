import { Request, Response } from 'express'
import { CreateServiceUseCase } from "../../../domain/use_cases/CreateServiceUseCase";
import { GetAllServicesUseCase } from "../../../domain/use_cases/GetAllServicesUseCase";
import { GetServiceById } from "../../../domain/use_cases/GetServiceById";
import { createServiceSchema } from '../zodSchemas/service.post.schema';
import { IHTTPErrorOutputDTO, IHTTPSuccessOutputDTO } from '../../dto/IHTTPOutputDTO';
import { IQueryParams } from '../../../domain/use_cases/interfaces/IQueryParams';

class ServiceController {
    constructor(private createServiceUseCase: CreateServiceUseCase,
        private getAllServicesUseCase: GetAllServicesUseCase,
        private getServiceById: GetServiceById) { }

    async createService(req: Request, resp: Response) {
        try {
            const { user_id, role } = req.user!
            const { body } = req

            const valid_body = createServiceSchema.parse(body)

            const response = await this.createServiceUseCase.execute(valid_body, { user_id, role })

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

            } else {

                resp.status(500).json(error)
            }
        }
    }

    async findAllServices(req: Request, resp: Response) {
        try {
            // const { user_id, role } = req.user!

            const params: IQueryParams = {
                active: true,
                offset: 0,
                limit: 0
            }

            const response = await this.getAllServicesUseCase.execute(params)
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

            } else {

                resp.status(500).json(error)
            }
        }
    }

    async findServiceById(req: Request, resp: Response) {
        try {
            // const { user_id, role } = req.user!
            const { id } = req.params

            const response = await this.getServiceById.execute(id)

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

            } else {

                resp.status(500).json(error)
            }
        }
    }
}

export { ServiceController }