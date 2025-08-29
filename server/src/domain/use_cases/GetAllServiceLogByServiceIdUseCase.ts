import { IRepository } from '../entities/interfaces/IRepository';
import { IQueryParams } from './interfaces/IQueryParams';

class GetAllServiceLogByServiceIdUseCase {
  constructor(private repository: IRepository) { }

  async execute(service_id: string, params: IQueryParams) {

    const response = await this.repository.findServicesLogByServiceId(service_id, params);

    if (!response) {
      throw new Error('There was not found any job registered!');
    }

    return response;
  }
}

export { GetAllServiceLogByServiceIdUseCase };
