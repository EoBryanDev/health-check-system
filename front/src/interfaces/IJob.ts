import { IServiceOutputDTO } from "./IService";


export interface IJobOutputWServiceDTO {
    job_id: string;
    group_id: string;
    job_name: string;
    job_description?: string;
    services: Array<IServiceOutputDTO> | [];
    interval_time: number; // in miliseconds
    active: boolean;
    created_at: string;
    created_by: string;
}

export interface IJobOutputWServiceAvailableDTO {
    job_id: string;
    group_id: string;
    job_name: string;
    job_description?: string;
    services: Array<IServiceOutputDTO>;
    interval_time: number; // in miliseconds
    created_at: string;
    active: boolean;
    created_by: string;
}

export interface IJobOutputDTO {
    job_id: string;
    group_id: string;
    job_name: string;
    job_description?: string;
    interval_time: number; // in miliseconds
    created_at: string;
    created_by?: string;
    updated_at?: string;
    active: boolean;
    updated_by?: string;
}

export interface IJobInputDTO {
    job_id?: string;
    group_id: string;
    group_name?: string;
    job_name: string;
    job_description?: string;
    active?: boolean;
    interval_time: number; // in miliseconds
}

export interface IJobLogInputDTO {
    job_id: string;
    start_at: string;
    duration: number;
}
export interface IJobLogOutputDTO {
    job_log_id: string;
    job_id: string;
    start_at: string;
    duration: number;
}

export type TJobExecutionMode = 'all' | 'group';

export interface IRunJobInputDTO {
    id?: string;
    mode: TJobExecutionMode;
}