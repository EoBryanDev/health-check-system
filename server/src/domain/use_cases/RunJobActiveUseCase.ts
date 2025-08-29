import axios, { AxiosError } from "axios";
import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IRepository } from "../entities/interfaces/IRepository";
import { IQueryParams } from "./interfaces/IQueryParams";
import { ICacheProvider } from "../services/interfaces/ICacheProvider";
import { IServiceLogInputDTO } from "../../infrastructure/dto/IServiceLogDTO";
import { IServiceInputDTO } from "../../infrastructure/dto/IServiceDTO";

class RunJobActiveUseCase {
  constructor(private repository: IRepository, private cacheRepository: ICacheProvider) { }

  async execute(job_id: string, data_in_token: IDataInToken = { user_id: '-1', role: 'NODE_CRON' }, _params: IQueryParams, method: 'HTTP' | 'JOB' = 'JOB') {



    await this.cacheRepository.set<boolean>('is_job_running', true);

    try {



      if (data_in_token.role === 'ANALYST') {
        throw new Error("You don't have priviledges enough to run a job");
      }

      const job_recovery = await this.cacheRepository.get<boolean>(
        `job_recovery_${job_id}`
      );

      if (job_recovery) {
        throw new Error("There was not time enought to recovery the last verification.");
      }

      const job = await this.repository.findJobById(job_id);

      if (!job) {
        throw new Error('There was not found any job active/registered');
      }

      if (job.services.length < 1) {
        throw new Error("There is not service in this job!");
      }


      for (let i = 0; i < job.services.length; i++) {
        const service = job.services[i];

        const service_recovery = await this.cacheRepository.get<boolean>(
          `service_recovery_${service.service_id}`
        );

        if (service_recovery) {
          throw new Error("There was not time enought to recovery the last verification.");
        }
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
        `job_recovery_${job_id}`,
        true,
        job.interval_time
      );

      for (let i = 0; i < job.services.length; i++) {
        const service = job.services[i];

        await this.cacheRepository.set<boolean>(
          `service_recovery_${service.service_id}`,
          true,
          cached_config!
        );
      }



      const startJob = new Date().toISOString();
      const startJob_time = Date.now();


      for (let j = 0; j < job.services.length; j++) {
        const service = job.services[j];
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
      }

      const endJob_time = Date.now();

      const job_log = {
        job_id: job.job_id,
        start_at: startJob,
        duration: endJob_time - startJob_time,
      };
      await this.repository.createJobLog(job_log);


    } catch (error) {
      const err = error instanceof Error && error.message
      throw new Error(err ? err : 'Error');

    } finally {
      await this.cacheRepository.del('is_job_running');
    }
  }

}

export { RunJobActiveUseCase }