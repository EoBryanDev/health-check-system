import { IServiceLogOutputDTO } from "./IServiceList";


export interface IServiceInputDTO {
    service_name: string;
    service_description?: string;
    service_url: string;
    group_id: string;
    job_id?: string;
    rate_limit_tolerance: number;
}

export interface IServiceOutputDTO {
    service_id: string;
    group_id: string;
    job_id?: string;
    service_name: string;
    service_description: string;
    service_url: string;
    last_run: string | null;
    rate_limit_tolerance: number;
    created_at: string;
    created_by: string;
}

export interface IServiceDetailOutputDTO extends IServiceOutputDTO {
    service_logs: IServiceLogOutputDTO[];
}