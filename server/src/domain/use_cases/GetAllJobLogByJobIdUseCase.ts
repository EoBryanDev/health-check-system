import { IRepository } from '../entities/interfaces/IRepository';
import { IQueryParams } from './interfaces/IQueryParams';

class GetAllJobLogByJobIdUseCase {
  constructor(private repository: IRepository) { }

  async execute(job_id: string, params: IQueryParams) {

    const response = await this.repository.findAllJobsLogByJobId(job_id, params);

    if (!response) {
      throw new Error('There was not found any job registered!');
    }

    return response;
  }
}

export { GetAllJobLogByJobIdUseCase };
