import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import {
  IAddUserToGroup,
  IUserGroup,
  IUserGroupInput,
} from '../../infrastructure/dto/IGroupDTO';
import { IRepository } from '../entities/interfaces/IRepository';

class AddUserToGroupUseCase {
  constructor(private dbRepository: IRepository) { }

  public async execute(
    payload_group: IAddUserToGroup,
    data_in_token: IDataInToken
  ): Promise<IUserGroup> {

    if (data_in_token.role === 'ANALYST') {
      throw new Error(
        'The current user does not have privileges to do this action.'
      );
    }

    const resp_group = await this.dbRepository.findGroupById(
      payload_group.group_id
    );

    if (!resp_group) {
      throw new Error('Group does not exist !');
    }

    const resp_group_user = await this.dbRepository.findGroupMemberById(payload_group.user_code, payload_group.group_id)

    if (resp_group_user) {
      throw new Error("Already was registered a user with this id in this group.");

    }


    const user_in_group: IUserGroupInput = {
      group_id: resp_group.group_id,
      user_code: payload_group.user_code,
    };

    const response =
      await this.dbRepository.createUserGroup(user_in_group);

    return response;
  }
}

export { AddUserToGroupUseCase };
