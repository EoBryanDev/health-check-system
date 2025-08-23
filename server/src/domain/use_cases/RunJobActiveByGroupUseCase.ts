import axios, { AxiosError } from "axios";
import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IJobInputDTO } from "../../infrastructure/dto/IJobDTO";
import { IRepository } from "../entities/interfaces/IRepository";
import { IQueryParams } from "./interfaces/IQueryParams";
import { IServiceLogInputDTO } from "../../infrastructure/dto/IServiceLogDTO";

class RunJobActiveByGroupUseCase {
    constructor(private repository: IRepository) { }

    async execute(group_id: string, data_in_token: IDataInToken, params: IQueryParams, method: 'HTTP') {

        if (data_in_token.role === 'ANALYST') {
            throw new Error("");
        }

        let jobs = await this.repository.findAllJobsByGroupId(group_id, params);

        if (!jobs) {
            throw new Error("There was not found any job active/registered");

        }



        for (let i = 0; i < jobs.length; i++) {
            const startJob = new Date().toISOString()
            const startJob_time = Date.now()
            const job = jobs[i];

            if (!job.services) {
                return null;
            }

            for (let j = 0; j < job.services.length; j++) {
                const service = job.services[j];
                const start = new Date().toISOString()



                const startService_time = Date.now()
                let response;

                try {
                    response = await axios.get(service.service_url);
                } catch (e: unknown) {
                    const axiosError = e as AxiosError
                    response = axiosError
                }

                const endService_time = Date.now()

                const duration = endService_time - startService_time

                const service_log: IServiceLogInputDTO = {
                    service_id: service.service_id,
                    start_at: start,
                    duration,
                    method,
                    status_code: response.status ?? 400,
                    requester: data_in_token.user_id,
                    device: 'Server',
                    classification: response.status === 200
                        ? duration > service.rate_limit_tolerance
                            ? 'WARNING'
                            : 'GOOD'
                        : 'ERROR',
                }

                await this.repository.createServiceLog(service_log)

            }

            const endJob_time = Date.now()

            const job_log = {
                job_id: job.job_id,
                start_at: startJob,
                duration: endJob_time - startJob_time,
            }
            await this.repository.createJobLog(job_log)
        }


    }
}

export { RunJobActiveByGroupUseCase }