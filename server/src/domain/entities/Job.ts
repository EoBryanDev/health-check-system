import { IJob } from "./interfaces/IJob";

class Job {

    private props: IJob;

    constructor(job_payload: IJob) {
        const job_constructor: IJob = {
            job_id: job_payload.job_id ?? undefined,
            group_id: job_payload.group_id,
            job_name: job_payload.job_name,
            job_description: job_payload.job_description ?? undefined,
            interval_time: job_payload.interval_time, // in miliseconds
            active: job_payload.active ?? true,
            created_at: job_payload.created_at ?? new Date().toISOString(),
            updated_at: job_payload.updated_at,
            created_by: job_payload.created_by,
        }

        this.props = job_constructor

    }

    public getJobInfo() {
        return this.props
    }
}

export { Job }