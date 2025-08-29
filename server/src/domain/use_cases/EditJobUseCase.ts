import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { ICreateJob } from '../../infrastructure/http/zodSchemas/job.put.schema';
import { IRepository } from '../entities/interfaces/IRepository';

class EditJobUseCase {
  constructor(private dbRepository: IRepository) { }

  public async execute(
    payload_job: ICreateJob,
    data_in_token: IDataInToken
  ) {

    if (data_in_token.role === 'ANALYST') {
      throw new Error(
        'The current user does not have privileges to do this action.'
      );
    }

    const isExistGroup = await this.dbRepository.findGroupById(
      payload_job.group_id
    );


    if (!isExistGroup) {
      throw new Error('Group does not exist.');
    }


    const response = await this.dbRepository.editJob(
      payload_job,
      data_in_token.user_id
    );

    return response
  }
}

export { EditJobUseCase };
