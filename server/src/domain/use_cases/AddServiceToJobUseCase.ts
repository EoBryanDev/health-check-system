import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IRepository } from '../entities/interfaces/IRepository';

class AddServiceToJobUseCase {
  constructor(private repository: IRepository) { }

  async execute(
    service_payload: { job_id: string, service_id: string },
    data_in_token: IDataInToken
  ) {
    if (data_in_token.role === 'ANALYST') {
      throw new Error('');
    }

    const existsJob = await this.repository.findJobById(
      service_payload.job_id!
    );

    if (!existsJob) {
      throw new Error('There was not found any job valid to add this service');
    }

    const service = await this.repository.findServiceById(service_payload.service_id);

    if (!service) {
      throw new Error('There was not found any service valid');
    }

    const payload = {
      ...service,
      last_run: null,
      job_id: service_payload.job_id
    }

    const response = await this.repository.createService(
      payload,
      data_in_token.user_id
    );

    return response;
  }
}

export { AddServiceToJobUseCase };
