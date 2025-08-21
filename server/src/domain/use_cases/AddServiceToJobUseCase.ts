import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IJobInputDTO } from "../../infrastructure/dto/IJobDTO";
import { IServiceInputDTO } from "../../infrastructure/dto/IServiceDTO";
import { IRepository } from "../entities/interfaces/IRepository";

class AddServiceToJobUseCase {
    constructor(private repository: IRepository) { }

    async execute(service_payload: IServiceInputDTO, data_in_token: IDataInToken) {

        if (data_in_token.role === 'ANALYST') {
            throw new Error("");

        }

        const existsGroup = await this.repository.findGroupById(service_payload.group_id)

        if (!existsGroup) {
            throw new Error("There was not found any group valid to add to this job");
        }

        if (!service_payload.job_name) {
            throw new Error("This operation can be done withou a job!");
        }

        const existsJob = await this.repository.findJobByName(service_payload.job_name)

        if (!existsJob) {
            throw new Error("There was not found any job valid to add this service");
        }

        const response = await this.repository.createService(service_payload, data_in_token.user_id);

        return response;


    }
}

export { AddServiceToJobUseCase }