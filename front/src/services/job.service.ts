import { IJob, IJobInputDTO } from "@/interfaces/IConfigurations";

export const addJob = async (item: IJobInputDTO): Promise<IJob> => {
    const newJob: IJob = {
        job_id: Date.now().toString(),
        name: item.job_name,
        group: item.group_name,
        group_id: item.group_id,
        description: item.job_description,
        interval_time: item.interval_time,
    };
    return new Promise((resolve) => setTimeout(() => resolve(newJob), 500));
};

export const removeJob = async (id: string): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve(id), 500));
};

export const editJob = async (item: IJob): Promise<IJob> => {
    // Lógica da API real para editar um job.
    return new Promise((resolve) => setTimeout(() => resolve(item), 500));
};