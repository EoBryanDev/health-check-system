import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IJobInputDTO } from '../../infrastructure/dto/IJobDTO';
import { IRepository } from '../entities/interfaces/IRepository';

class CreateJobUseCase {
  constructor(private repository: IRepository) { }

  async execute(job_payload: IJobInputDTO, data_in_token: IDataInToken) {
    if (data_in_token.role === 'ANALYST') {
      throw new Error('');
    }

    const groups = await this.repository.findGroupById(
      job_payload.group_id
    );

    if (!groups) {
      throw new Error('There was not found any group valid for this job!');
    }

    const alreadyExistJob = await this.repository.findJobByName(
      job_payload.job_name
    );

    if (alreadyExistJob) {
      throw new Error('This job name is already in use!');
    }

    const response = await this.repository.createJob(
      job_payload,
      data_in_token.user_id
    );

    return response;
  }
}

export { CreateJobUseCase };
