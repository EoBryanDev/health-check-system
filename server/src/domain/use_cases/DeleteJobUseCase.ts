import { IRepository } from '../entities/interfaces/IRepository';

class DeleteJobUseCase {
  constructor(private dbRepository: IRepository) { }

  async execute(group_id: string) {
    await this.dbRepository.deleteJob(group_id);
  }
}

export { DeleteJobUseCase };
