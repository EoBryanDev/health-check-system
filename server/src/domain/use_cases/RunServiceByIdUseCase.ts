import axios, { AxiosError } from 'axios';
import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IRepository } from '../entities/interfaces/IRepository';
import { IServiceLogInputDTO } from '../../infrastructure/dto/IServiceLogDTO';
import { ICacheProvider } from '../services/interfaces/ICacheProvider';
import { IServiceInputDTO } from '../../infrastructure/dto/IServiceDTO';

class RunServiceByIdUseCase {
  constructor(
    private repository: IRepository,
    private cacheRepository: ICacheProvider
  ) { }

  async execute(
    service_id: string,
    data_in_token: IDataInToken = { user_id: '-1', role: 'NODE_CRON' },
    method: 'HTTP' | 'JOB' = 'JOB'
  ) {
    const isJobRunning =
      await this.cacheRepository.get<boolean>('is_job_running');

    if (isJobRunning) {
      throw new Error('There is already a job running.');
    }

    await this.cacheRepository.set<boolean>('is_job_running', true);

    try {

      if (data_in_token.role === 'ANALYST') {
        throw new Error("You don't have priviledges enough to run a job");
      }


      const service = await this.repository.findServiceById(service_id)

      if (!service) {
        throw new Error("There was not found any service active/registered");
      }



      const service_recovery = await this.cacheRepository.get<boolean>(
        `service_recovery_${service.service_id}`
      );

      if (service_recovery) {
        throw new Error("There was not time enought to recovery the last verification.");
      }

      let cached_config = await this.cacheRepository.get<number>('recovery_time_in_seconds')
      if (!cached_config) {

        const config = await this.repository.findConfigByName(
          'recovery_time_in_seconds'
        );

        if (config?.value) {

          cached_config = config.value ? config.value : 120
        } else {
          cached_config = 120
        }

      }




      await this.cacheRepository.set<boolean>(
        `service_recovery_${service.service_id}`,
        true,
        cached_config!
      );

      const start = new Date().toISOString();

      const startService_time = Date.now();
      let response;

      try {
        response = await axios.get(service.service_url);
      } catch (e: unknown) {
        const axiosError = e as AxiosError;
        response = axiosError;
      }

      const endService_time = Date.now();

      const duration = endService_time - startService_time;

      const service_log: IServiceLogInputDTO = {
        service_id: service.service_id,
        start_at: start,
        duration,
        method,
        status_code: response.status ?? 400,
        requester: data_in_token.user_id,
        device: 'Server',
        classification:
          response.status === 200
            ? duration > service.rate_limit_tolerance
              ? 'WARNING'
              : 'GOOD'
            : 'ERROR',
      };

      await this.repository.createServiceLog(service_log);
      const update_service: IServiceInputDTO = {
        service_id: service.service_id,
        group_id: service.group_id,
        last_run: new Date(),
        service_name: service.service_name,
        service_url: service.service_url,
        rate_limit_tolerance: service.rate_limit_tolerance
      }
      await this.repository.editService(update_service, data_in_token.user_id)

    } catch (error) {

      console.log(error);

    } finally {
      await this.cacheRepository.del('is_job_running');
    }
  }

}


export { RunServiceByIdUseCase };
