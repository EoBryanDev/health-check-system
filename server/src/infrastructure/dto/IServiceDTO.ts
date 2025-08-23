
interface IServiceInputDTO {
    group_id: string;
    group_name: string;
    job_id?: string;
    job_name?: string;
    last_run: Date,
    service_name: string;
    service_description?: string;
    service_url: string;
    rate_limit_tolerance: number;
}

interface IServiceOutputDTO {
    service_id: string;
    group_id: string;
    job_id?: string;
    service_name: string;
    service_description?: string;
    service_url: string;
    last_run: Date | null,
    rate_limit_tolerance: number;
    created_at: string;
    created_by: string;

}



export { IServiceInputDTO, IServiceOutputDTO }