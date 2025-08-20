interface IJobLogInputDTO {

    job_id: string,
    start_at: string,
    duration: number,

}
interface IJobLogOutputDTO {

    job_id: string,
    start_at: string,
    duration: number,

}

export { IJobLogInputDTO, IJobLogOutputDTO }