interface IServiceLogInputDTO {
    service_id: string,
    start_at: string,
    duration: number,
    method: string,
    status_code: number,
    requester: string,
    device: string,
    classification: string,
}

interface IServiceLogOutputDTO {
    service_log_id: string,
    service_id: string,
    start_at: string,
    duration: number,
    method: string,
    status_code: number,
    requester: string,
    device: string,
    classification: string,
}

export { IServiceLogInputDTO, IServiceLogOutputDTO }