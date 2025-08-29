import { IApiResponse } from "@/interfaces/IApiResponse";
import { IServiceInputDTO, IServiceOutputDTO } from "@/interfaces/IService";

const API_INTERNAL_URL = '/api';

export const createService = async (serviceData: IServiceInputDTO): Promise<IApiResponse<IServiceOutputDTO>> => {
    const response = await fetch(`${API_INTERNAL_URL}/services`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create service");
    }

    return response.json();
};

export const getAllServices = async (): Promise<IApiResponse<IServiceOutputDTO[] | null>> => {
    const response = await fetch(`${API_INTERNAL_URL}/services`, {
        method: "GET"
    });

    if (!response.ok) {
        if (response.status === 404 || response.status === 204) {
            return { success: true, data: null };
        }
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch services");
    }

    return response.json();
};

export const getServiceById = async (id: string): Promise<IApiResponse<IServiceOutputDTO>> => {
    const response = await fetch(`${API_INTERNAL_URL}/services/${id}`, {
        method: "GET"
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch service");
    }

    return response.json();
};

export const updateService = async (serviceData: IServiceInputDTO): Promise<IApiResponse<IServiceOutputDTO>> => {

    const response = await fetch(`${API_INTERNAL_URL}/services`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update service");
    }

    return response.json();
};

export const removeService = async (serviceId: string): Promise<void> => {
    const response = await fetch(`${API_INTERNAL_URL}/services/${serviceId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove service.');
    }
};

export const runJob = async (service_id: string): Promise<IApiResponse<void>> => {
    try {
        const response = await fetch(`${API_INTERNAL_URL}/services/${service_id}/run-service`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to run job.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error running job:", error);
        throw error;
    }
};