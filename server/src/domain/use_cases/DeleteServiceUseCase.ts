import { IRepository } from '../entities/interfaces/IRepository';

class DeleteServiceUseCase {
  constructor(private dbRepository: IRepository) { }

  async execute(service_id: string) {
    await this.dbRepository.deleteService(service_id);
  }
}

export { DeleteServiceUseCase };
