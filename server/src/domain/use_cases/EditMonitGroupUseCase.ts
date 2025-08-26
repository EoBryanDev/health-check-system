import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IGroupInputDTO } from '../../infrastructure/dto/IGroupDTO';
import { IRepository } from '../entities/interfaces/IRepository';

class EditMonitGroupUseCase {
  constructor(private dbRepository: IRepository) { }

  public async execute(
    payload_group: IGroupInputDTO,
    data_in_token: IDataInToken
  ) {

    if (data_in_token.role === 'ANALYST') {
      throw new Error(
        'The current user does not have privileges to do this action.'
      );
    }


    if (!payload_group.group_id) {
      throw new Error("This operation needs group id.");

    }
    const isExistGroup = await this.dbRepository.findGroupById(
      payload_group.group_id
    );


    if (!isExistGroup) {
      throw new Error('Group does not exist.');
    }

    const user = await this.dbRepository.findUserByEmail(payload_group.users_email)

    if (!user) {
      throw new Error('Do not exist this user sent.');
    }

    const edit_group_payload = {
      ...payload_group,
      group_id: payload_group.group_id!,
      user_id: user.user_id
    }

    const response = await this.dbRepository.editGroup(
      edit_group_payload,
      data_in_token.user_id
    );

    return response
  }
}

export { EditMonitGroupUseCase };
