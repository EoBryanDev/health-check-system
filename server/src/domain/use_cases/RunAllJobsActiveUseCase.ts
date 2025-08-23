import axios, { AxiosError } from "axios";
import { IDataInToken } from "../../infrastructure/dto/IDataInToken";
import { IRepository } from "../entities/interfaces/IRepository";
import { IQueryParams } from "./interfaces/IQueryParams";
import { IServiceLogInputDTO } from "../../infrastructure/dto/IServiceLogDTO";
import { ICacheProvider } from "../services/interfaces/ICacheProvider";
import { IJobOutputWServiceAvailableDTO } from "../../infrastructure/dto/IJobDTO";

class RunAllJobsActiveUseCase {
    constructor(private repository: IRepository, private cacheRepository: ICacheProvider) { }

    async execute(data_in_token: IDataInToken = { user_id: '-1', role: 'NODE_CRON' }, params: IQueryParams, method: 'HTTP' | 'JOB' = 'JOB') {

        const isJobRunning = await this.cacheRepository.get<boolean>('is_job_running');

        if (isJobRunning) {
            throw new Error("There is already a job running.");
        }

        if (data_in_token.role === 'ANALYST') {
            throw new Error("");
        }

        if (data_in_token.role === 'MANAGER') {
            throw new Error("");
        }

        let lastRun = await this.cacheRepository.get<Date>('last_run');

        let jobRecoveryTime = await this.cacheRepository.get<Number>('recovery_time_in_seconds');

        const now = new Date();

        if (!jobRecoveryTime) {
            const config = await this.repository.findConfigByName('recovery_time_in_seconds')

            if (!config) {
                jobRecoveryTime = 300 /*  5 min */
            }

            jobRecoveryTime = Number(config!.value)

            await this.cacheRepository.set<Number>('recovery_time_in_seconds', Number(config!.value), 360);
        }

        if (lastRun) {

            const future = new Date(new Date(lastRun).getTime() + Number(jobRecoveryTime) * 1000);

            if (now < future) {
                if (method === 'JOB') {
                    console.log('There was not time enought to recovery the cooldown time to service verification.');
                    return 'There was not time enought to recovery the cooldown time to service verification.'
                }
                throw new Error("There was not time enought to recovery the cooldown time to service verification.");
            }
        }

        const jobs = await this.repository.findAllJobsWService(params)

        if (!jobs) {
            throw new Error("There was not found any job active/registered");
        }

        const elegive_job: IJobOutputWServiceAvailableDTO[] = []

        jobs.forEach(job => {
            const run_interval = job.interval_time
            let non_elegible = false

            for (const service of job.services) {
                if (service.last_run) {
                    const future = new Date(service.last_run.getTime() + run_interval * 1000);

                    if (now < future) {
                        non_elegible = true;
                        break;
                    }
                }
            }

            if (!non_elegible) {
                elegive_job.push(job)
            }

        })

        await this.cacheRepository.del('last_run');
        await this.cacheRepository.set<Date>('last_run', new Date());

        await this.cacheRepository.set<boolean>('is_job_running', true);

        for (let i = 0; i < elegive_job.length; i++) {
            const startJob = new Date().toISOString()
            const startJob_time = Date.now()
            const job = jobs[i];

            if (!job.services) {

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

        await this.cacheRepository.del('is_job_running');

        if (method === 'JOB') {
            console.log('Job Successfully Runned!');
            return 'Job Successfully Runned!'
        }


    }
}

export { RunAllJobsActiveUseCase }