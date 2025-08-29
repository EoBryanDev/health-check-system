import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IServiceInputDTO } from '../../infrastructure/dto/IServiceDTO';
import { IEditServiceSchema } from '../../infrastructure/http/zodSchemas/service.put.schema';
import { IRepository } from '../entities/interfaces/IRepository';

class EditServiceUseCase {
  constructor(private dbRepository: IRepository) { }


  async execute(
    service_payload: IEditServiceSchema,
    data_in_token: IDataInToken
  ) {

    if (!service_payload.service_id) {
      throw new Error("This operation requires service id.");

    }

    if (data_in_token.role === 'ANALYST') {
      throw new Error('This user does not have permission to this!');
    }

    const payload: IServiceInputDTO = {
      service_id: service_payload.service_id,
      group_id: service_payload.group_id,
      last_run: service_payload.last_run ?? null,
      service_name: service_payload.service_name,
      service_description: service_payload.service_description,
      service_url: service_payload.service_url,
      rate_limit_tolerance: service_payload.rate_limit_tolerance,
      job_id: service_payload.job_id
    }

    const response = await this.dbRepository.editService(
      payload,
      data_in_token.user_id
    );

    return response;
  }
}

export { EditServiceUseCase };
