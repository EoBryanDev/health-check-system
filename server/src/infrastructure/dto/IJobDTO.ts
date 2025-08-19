interface IJobOutputDTO {
    job_id: string,
    group_id: string,
    job_name: string,
    job_description?: string,
    interval_time: number, // in miliseconds
    created_at: string,
    created_by: string
}

interface IJobInputDTO {
    group_name: string,
    job_name: string,
    job_description?: string,
    interval_time: number, // in miliseconds
    created_by: string
}

export { IJobInputDTO, IJobOutputDTO }