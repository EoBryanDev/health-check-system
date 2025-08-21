import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IJobInputDTO } from "../../infrastructure/dto/IJobDTO";
import { IRepository } from "../entities/interfaces/IRepository";
import { IQueryParams } from "./interfaces/IQueryParams";

class GetAllJobsUseCase {
    constructor(private repository: IRepository) { }

    async execute(data_in_token: IDataInToken, params: IQueryParams) {

        if (data_in_token.role === 'ANALYST') {
            throw new Error("");
        }

        const response = await this.repository.findAllJobs(params)

        if (!response) {
            throw new Error("There was not found any job registered!");

        }

        return response;


    }
}

export { GetAllJobsUseCase }