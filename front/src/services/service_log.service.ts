import { IApiResponse } from "@/interfaces/IApiResponse";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";

const API_INTERNAL_URL = '/api';

export const getAllServicesLogs = async ({ offset, limit }: { offset: number, limit: number }): Promise<IApiResponse<IServiceLogOutputDTO[] | null>> => {


    const url = `${API_INTERNAL_URL}/services/?offset=${offset}&limit=${limit}`;


    const response = await fetch(url, {
        method: "GET"
    });



    if (!response.ok) {
        if (response.status === 404 || response.status === 204) {
            return { success: true, data: null };
        }
        const errorText = await response.text();

        throw new Error(errorText || "Failed to fetch services");
    }

    const data = await response.json();

    return data;
};

export const getAllServicesLogsById = async ({ service_id, offset, limit }: { service_id: string, offset: number, limit: number }): Promise<IApiResponse<IServiceLogOutputDTO[] | null>> => {

    if (!service_id || service_id.trim() === '') {
        throw new Error('service_id é obrigatório');
    }

    if (offset < 0 || limit < 1) {

        throw new Error('offset deve ser >= 0 e limit deve ser >= 1');
    }

    const url = `${API_INTERNAL_URL}/services/${service_id}/service-logs?offset=${offset}&limit=${limit}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });


    if (!response.ok) {
        const errorText = await response.text();

        if (response.status === 404 || response.status === 204) {
            return { success: true, data: null, offset, limit };
        }


        let errorMessage;
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorData.message || errorText;
        } catch {
            errorMessage = errorText;
        }

        throw new Error(errorMessage || "Failed to fetch services logs");
    }

    const responseData = await response.json();


    return {
        success: true,
        data: responseData.data,
        offset: responseData.offset,
        limit: responseData.limit
    };
};