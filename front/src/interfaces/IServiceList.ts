export interface IServiceOutputDTO {
    service_id: string;
    group_id: string;
    job_id?: string;
    service_name: string;
    service_description?: string;
    service_url: string;
    last_run: string | null;
    rate_limit_tolerance: number;
    created_at: string;
    created_by: string;
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