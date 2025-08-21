import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IGroupInputDTO, IUserGroup, IUserGroupInput } from "../../infrastructure/dto/IGroupDTO";
import { IMonitGroup } from "../entities/interfaces/IMonitGroup";
import { IRepository } from "../entities/interfaces/IRepository";
import { MonitGroup } from "../entities/MonitGroup";

class AddUserToGroupUseCase {
    constructor(private inMemoryRepository: IRepository) { }

    public async execute(payload_group: IGroupInputDTO, data_in_token: IDataInToken): Promise<IUserGroup> {
        if (data_in_token.role === 'ANALYST') {
            throw new Error("The current user does not have privileges to do this action!");
        }

        const resp_group = await this.inMemoryRepository.findGroupByName(payload_group.group_name)

        if (!resp_group) {
            throw new Error("Group does not exist !");

        }

        const user_in_group: IUserGroupInput = {
            group_id: resp_group.group_id,
            user_id: data_in_token.user_id
        }

        const response = await this.inMemoryRepository.createUserGroup(user_in_group)




        return response
    }

}

export { AddUserToGroupUseCase }