import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IRepository } from '../entities/interfaces/IRepository';

class RemoveServiceFromJobUseCase {
  constructor(private repository: IRepository) { }

  async execute(
    service_payload: { job_id: string, service_id: string },
    data_in_token: IDataInToken
  ) {
    if (data_in_token.role === 'ANALYST') {
      throw new Error("The current user does not have privileges to do this action.");
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

    await this.repository.deleteServiceFromJob(
      service_payload.service_id,
      service_payload.job_id
    );

  }
}

export { RemoveServiceFromJobUseCase };
