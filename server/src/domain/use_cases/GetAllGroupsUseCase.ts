import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IGroupOutputUsersDTO } from '../../infrastructure/dto/IGroupDTO';
import { IRepository } from '../entities/interfaces/IRepository';
import { IQueryParams } from './interfaces/IQueryParams';

class GetAllGroupsUseCase {
  constructor(private inMemoryRepository: IRepository) { }

  public async execute(
    data_in_token: IDataInToken,
    params: IQueryParams
  ): Promise<IGroupOutputUsersDTO[]> {
    if (data_in_token.role === 'ANALYST') {
      throw new Error(
        'The current user does not have privileges to do this action!'
      );
    }

    const response = await this.inMemoryRepository.findAllGroups(params);

    if (!response) {
      throw new Error('There was not found any group!');
    }

    return response;
  }
}

export { GetAllGroupsUseCase };
