import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IServiceInputDTO } from '../../infrastructure/dto/IServiceDTO';
import { IRepository } from '../entities/interfaces/IRepository';

class CreateServiceUseCase {
  constructor(private dbRepository: IRepository) { }

  async execute(
    service_payload: IServiceInputDTO,
    data_in_token: IDataInToken
  ) {
    if (data_in_token.role === 'ANALYST') {
      throw new Error('This user does not have permission to this!');
    }

    const alreadyExistService = await this.dbRepository.findServiceByName(
      service_payload.service_name
    );

    if (alreadyExistService) {
      throw new Error('Already exist a service with the same name.');
    }

    const response = await this.dbRepository.createService(
      service_payload,
      data_in_token.user_id
    );

    return response;
  }
}

export { CreateServiceUseCase };
