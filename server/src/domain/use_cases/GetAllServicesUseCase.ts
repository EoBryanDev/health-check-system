import { IRepository } from "../entities/interfaces/IRepository";
import { IQueryParams } from "./interfaces/IQueryParams";

class GetAllServicesUseCase {
    constructor(private dbRepository: IRepository) { }

    async execute(params: IQueryParams) {

        const response = await this.dbRepository.findAllServices(params);

        if (!response) {
            throw new Error("There was not found any service with the id informed.");
        }

        return response;
    }
}

export { GetAllServicesUseCase }