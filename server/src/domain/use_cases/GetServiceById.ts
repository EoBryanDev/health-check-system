import { IRepository } from '../entities/interfaces/IRepository';

class GetServiceById {
  constructor(private dbRepository: IRepository) {}

  async execute(service_id: string) {
    const response = await this.dbRepository.findServiceById(service_id);

    if (!response) {
      throw new Error('There was not found any service with the id informed.');
    }

    return response;
  }
}

export { GetServiceById };
