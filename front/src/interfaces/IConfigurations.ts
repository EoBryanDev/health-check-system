// src/interfaces/IConfigurations.ts

// Interfaces de entrada (DTOs de criação/atualização)
export interface IGroupInputDTO {
    group_name: string;
    group_description?: string;
    users_email: string; // Adicionei de volta, pois estava no seu exemplo
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

// Interfaces de saída (DTOs de retorno da API)
export interface IGroupOutputDTO {
    group_id: string;
    group_name: string;
    group_description: string;
    active: boolean;
    created_at: string;
    updated_at: string | null;
    created_by: string;
    users_email: string;
}

export interface IJobOutputDTO {
    job_id: string;
    job_name: string;
    group_id: string;
    group_name: string;
    job_description: string;
    interval_time: number;
    created_at: string;
    updated_at: string | null;
}

export interface IServiceOutputDTO {
    service_id: string;
    service_name: string;
    service_description: string;
    service_url: string;
    group_id: string;
    group_name: string;
    job_id: string | null;
    job_name: string | null;
    last_run: string | null;
    rate_limit_tolerance: number;
    created_at: string;
    updated_at: string | null;
}