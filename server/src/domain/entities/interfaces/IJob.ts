interface IJob {
    job_id?: string,
    group_id: string,
    job_name: string,
    job_description?: string,
    interval_time: number, // in miliseconds
    active?: boolean,
    created_at?: string,
    updated_at?: string,
    created_by: string
}

export { IJob }
