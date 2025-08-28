export interface IServiceInputDTO {
    service_id?: string;
    group_id: string;
    active?: boolean;
    group_name?: string;
    job_id?: string;
    job_name?: string;
    last_run: Date | null;
    service_name: string;
    service_description?: string;
    service_url: string;
    rate_limit_tolerance: number;
}

export interface IServiceOutputDTO {
    service_id: string;
    group_id: string;
    job_id?: string;
    active: boolean;
    service_name: string;
    service_description?: string;
    service_url: string;
    last_run: string | null;
    rate_limit_tolerance: number;
    created_at: string;
    created_by: string;
    updated_by?: string;
    updated_at?: string;
}


