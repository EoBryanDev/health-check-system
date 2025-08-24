import { IService, IServiceInputDTO } from "@/interfaces/IConfigurations";

export const addService = async (item: IServiceInputDTO): Promise<IService> => {
    const newService: IService = {
        service_id: Date.now().toString(),
        name: item.service_name,
        url: item.service_url,
        description: item.service_description,
        group_id: item.group_id,
        group: item.group_name,
        job_id: item.job_id,
        job_name: item.job_name,
        last_run: item.last_run,
        rate_limit_tolerance: item.rate_limit_tolerance,
    };
    return new Promise((resolve) => setTimeout(() => resolve(newService), 500));
};

export const removeService = async (id: string): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve(id), 500));
};


export const editService = async (item: IService): Promise<IService> => {
    // Lógica da API real para editar um serviço.
    return new Promise((resolve) => setTimeout(() => resolve(item), 500));
};