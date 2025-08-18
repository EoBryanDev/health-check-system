import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IGroupInputDTO } from "../../infrastructure/dto/IGroupDTO";
import { IMonitGroup } from "../entities/interfaces/IMonitGroup";
import { IRepository } from "../entities/interfaces/IRepository";
import { MonitGroup } from "../entities/MonitGroup";

class CreateMonitGroupUseCase {
    constructor(private inMemoryRepository: IRepository) { }

    public async execute(payload_group: IGroupInputDTO, data_in_token: IDataInToken) {
        if (data_in_token.role === 'ANALYST') {
            throw new Error("The current user does not have privileges to do this action!");

        }

        const alreadyExistGroup = await this.inMemoryRepository.findGroupByName(payload_group.group_name)

        if (alreadyExistGroup) {
            throw new Error("Group name is already registered");

        }
        const newId = 'a'

        const newGroup_payload: IMonitGroup = {
            group_id: newId,
            created_by: data_in_token.user_id,
            ...payload_group,
        }

        const newGroup = new MonitGroup(newGroup_payload)

        const response = await this.inMemoryRepository.createGroup(newGroup)

        return response
    }

}

export { CreateMonitGroupUseCase }