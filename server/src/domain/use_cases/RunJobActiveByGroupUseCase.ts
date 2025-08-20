import axios, { AxiosError } from "axios";
import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IJobInputDTO } from "../../infrastructure/dto/IJobDTO";
import { IRepository } from "../entities/interfaces/IRepository";
import { IQueryParams } from "./interfaces/IQueryParams";

class RunJobActiveByGroupUseCase {
    constructor(private repository: IRepository) { }

    async execute(group_id: string, data_in_token: IDataInToken, params: IQueryParams, method: 'HTTP') {

        if (data_in_token.role === 'ANALYST') {
            throw new Error("");
        }

        let jobs = await this.repository.findAllJobsLogByGroupId(group_id);

        if (!jobs) {
            throw new Error("There was not found any job active/registered");

        }

        if (data_in_token.role === 'MANAGER') {
            jobs = jobs.filter(job => job.created_by === data_in_token.user_id)
        }


        for (let i = 0; i < jobs.length; i++) {
            const startJob = new Date().toISOString()
            const startJob_time = new Date().getMilliseconds()
            const job = jobs[i];

            if (!job.services) {

            }

            for (let j = 0; j < job.services.length; j++) {
                const service = job.services[j];



                const startService_time = new Date().getMilliseconds()
                let response;

                try {
                    response = await axios.get(service.service_url);
                } catch (e: unknown) {
                    const axiosError = e as AxiosError
                    response = axiosError
                }

                const endService_time = new Date().getMilliseconds()

                const duration = endService_time - startService_time

                const service_log = {
                    service_id: service.service_id,
                    start_at: new Date().toISOString(),
                    duration,
                    method,
                    status_code: response.status ?? 400,
                    requester: data_in_token.user_id,
                    device: 'Server',
                    classification: response.status === 200 ? duration > service.rate_limit_tolerance ? 'WARNING' : 'GOOD' : 'ERROR',
                }

                await this.repository.createServiceLog(service_log)

            }

            const endJob_time = new Date().getMilliseconds()

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