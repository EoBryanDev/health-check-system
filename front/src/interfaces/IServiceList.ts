type TClassificafion = 'GOOD' | 'WARNING' | 'ERROR';
type TMethod = 'HTTP' | 'JOB';

export interface IServiceLogInputDTO {
    service_id: string;
    start_at: string;
    duration: number;
    method?: TMethod;
    status_code: number;
    requester: string;
    device: string;
    classification: TClassificafion;
}

export interface IServiceLogOutputDTO {
    service_log_id: string;
    service_id: string;
    start_at: string;
    duration: number;
    method: string;
    status_code: number;
    requester: string;
    device: string;
    classification: string;
}

