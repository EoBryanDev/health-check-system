export interface IGroupInputDTO {
    group_name: string;
    group_description?: string;
    users_email: string;
}

export interface IJobInputDTO {
    group_id: string;
    group_name: string;
    job_name: string;
    job_description?: string;
    interval_time: number;
}

export interface IServiceInputDTO {
    group_id: string;
    group_name: string;
    job_id?: string;
    job_name?: string;
    last_run?: Date | null;
    service_name: string;
    service_description?: string;
    service_url: string;
    rate_limit_tolerance: number;
}


export interface IGroup {
    group_id: string;
    name: string;
    user: string;
    description?: string;
}

export interface IJob {
    job_id: string;
    name: string;
    group: string;
    group_id: string;
    description?: string;
    interval_time: number;
}

export interface IService {
    service_id: string;
    name: string;
    url: string;
    description?: string;
    group?: string;
    group_id?: string;
    job_id?: string;
    job_name?: string;
    last_run?: Date | null;
    rate_limit_tolerance: number;
}

export type TAnyConfigItem = IGroup | IJob | IService;

export interface ApiResponse<T> {
    data: T;
}
export interface IGroupInputDTO {
    group_name: string;
    group_description?: string;
    users_email: string;
}

export interface IJobInputDTO {
    group_id: string;
    group_name: string;
    job_name: string;
    job_description?: string;
    interval_time: number;
}

export interface IServiceInputDTO {
    group_id: string;
    group_name: string;
    job_id?: string;
    job_name?: string;
    last_run?: Date | null;
    service_name: string;
    service_description?: string;
    service_url: string;
    rate_limit_tolerance: number;
}