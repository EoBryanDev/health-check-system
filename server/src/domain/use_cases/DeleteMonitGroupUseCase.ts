import { IRepository } from '../entities/interfaces/IRepository';

class DeleteMonitGroupUseCase {
  constructor(private dbRepository: IRepository) { }

  async execute(group_id: string) {
    await this.dbRepository.deleteGroup(group_id);
  }
}

export { DeleteMonitGroupUseCase };
