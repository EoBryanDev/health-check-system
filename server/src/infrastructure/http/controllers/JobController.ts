import { Request, Response } from "express";
import { AddServiceToJobUseCase } from "../../../domain/use_cases/AddServiceToJobUseCase";
import { CreateJobUseCase } from "../../../domain/use_cases/CreateJobUseCase";
import { GetAllJobsUseCase } from "../../../domain/use_cases/GetAllJobsUseCase";
import { RunAllJobsActiveUseCase } from "../../../domain/use_cases/RunAllJobsActiveUseCase";
import { RunJobActiveByGroupUseCase } from "../../../domain/use_cases/RunJobActiveByGroupUseCase";
import { RunJobActiveUseCase } from "../../../domain/use_cases/RunJobActiveUseCase";
import { IQueryParams } from "../../../domain/use_cases/interfaces/IQueryParams";
import { IHTTPErrorOutputDTO, IHTTPSuccessOutputDTO } from "../../dto/IHTTPOutputDTO";
import { createJobchema } from "../zodSchemas/job.post.schema";
import { createServiceJobSchema } from "../zodSchemas/service_job.post.schema";

class JobController {
    constructor(private createJobUseCase: CreateJobUseCase,
        private getAllJobsUseCase: GetAllJobsUseCase,
        private addServiceToJobUseCase: AddServiceToJobUseCase,
        private runJobActiveByGroupUseCase: RunJobActiveByGroupUseCase,
        private runJobActiveUseCase: RunJobActiveUseCase,
        private runAllJobsActiveUseCase: RunAllJobsActiveUseCase) { }

    async createJob(req: Request, resp: Response) {
        try {
            const { user_id, role } = req.user!

            const { body } = req

            const valid_body = createJobchema.parse(body)
            const response = await this.createJobUseCase.execute(valid_body, { user_id, role })

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

    async findAll(req: Request, resp: Response) {
        try {
            const { user_id, role } = req.user!

            const params: IQueryParams = {
                active: true,
                offset: 0,
                limit: 0
            }
            const response = await this.getAllJobsUseCase.execute({ user_id, role }, params)

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

    async addServiceToJob(req: Request, resp: Response) {
        try {
            const { user_id, role } = req.user!
            const { body } = req.body

            const valid_body = createServiceJobSchema.parse(body)

            const response = await this.addServiceToJobUseCase.execute(valid_body, { user_id, role })

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

    async runJob(req: Request, resp: Response) {
        try {
            const { user_id, role } = req.user!
            const { mode } = req.query
            const { id } = req.params

            const params: IQueryParams = {
                active: true,
                offset: 0,
                limit: 0
            }

            // talvez pudesse fazer um simple factory
            if (mode === 'all') {
                await this.runAllJobsActiveUseCase.execute({ user_id, role }, params, 'HTTP')
            } else if (mode === 'group') {
                await this.runJobActiveByGroupUseCase.execute(id, { user_id, role }, params, 'HTTP')
            } else {
                // preciso voltar para implementar esse cara
                await this.runJobActiveUseCase.execute({ user_id, role }, params, 'HTTP')
            }
            const outputSuccessDTO: IHTTPSuccessOutputDTO = {
                data: {
                    message: "Job runned!"
                }
            }

            resp.status(200).json(outputSuccessDTO)
            // esqueci de implementar o rodar 

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
export { JobController }