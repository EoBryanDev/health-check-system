import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IGroupInputDTO, IGroupOutputDTO } from "../../infrastructure/dto/IGroupDTO";
import { IMonitGroup } from "../entities/interfaces/IMonitGroup";
import { IRepository } from "../entities/interfaces/IRepository";
import { MonitGroup } from "../entities/MonitGroup";

class CreateMonitGroupUseCase {
    constructor(private inMemoryRepository: IRepository) { }

    public async execute(payload_group: IGroupInputDTO, data_in_token: IDataInToken) {
        if (data_in_token.role === 'ANALYST') {
            throw new Error("The current user does not have privileges to do this action!");

        }

        const users_created: IMonitGroup[] = []



        const alreadyExistGroup = await this.inMemoryRepository.findGroupByName(payload_group.group_name)
        if (alreadyExistGroup) {
            throw new Error("Group name is already registered");

        }

        const response = await this.inMemoryRepository.createGroup(payload_group, data_in_token.user_id)

        users_created.push(response)



        return users_created
    }

}

export { CreateMonitGroupUseCase }