import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import {
  IAddUserToGroup,
  IUserGroupInput,
} from '../../infrastructure/dto/IGroupDTO';
import { IRepository } from '../entities/interfaces/IRepository';

class RemoveUserFromGroupUseCase {
  constructor(private dbRepository: IRepository) { }

  public async execute(
    payload_group: IAddUserToGroup,
    data_in_token: IDataInToken
  ) {

    if (data_in_token.role === 'ANALYST') {
      throw new Error(
        'The current user does not have privileges to do this action.'
      );
    }

    const resp_group = await this.dbRepository.findGroupById(
      payload_group.group_id
    );

    if (!resp_group) {
      throw new Error('Group does not exist.');
    }

    const resp_group_user = await this.dbRepository.findGroupMemberById(payload_group.user_code)

    if (!resp_group_user) {
      throw new Error("The user is not in current group to be removed.");
    }

    const user_in_group: IUserGroupInput = {
      group_id: resp_group.group_id,
      user_code: payload_group.user_code,
    };

    await this.dbRepository.deleteUserFromGroup(
      user_in_group.user_code,
      user_in_group.group_id
    );


  }
}

export { RemoveUserFromGroupUseCase };
