import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IGroupInputDTO, IGroupOutputDTO } from "../../infrastructure/dto/IGroupDTO";
import { IMonitGroup } from "../entities/interfaces/IMonitGroup";
import { IRepository } from "../entities/interfaces/IRepository";
import { MonitGroup } from "../entities/MonitGroup";

class GetAllGroupsUseCase {
    constructor(private inMemoryRepository: IRepository) { }

    public async execute(data_in_token: IDataInToken): Promise<IGroupOutputDTO[]> {
        if (data_in_token.role === 'ANALYST') {
            throw new Error("The current user does not have privileges to do this action!");

        }

        const response = await this.inMemoryRepository.findAllGroups()

        if (!response) {
            throw new Error("There was not found any group!");

        }



        return response
    }

}

export { GetAllGroupsUseCase }