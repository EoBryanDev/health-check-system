import { IApiResponse } from "@/interfaces/IApiResponse";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";

const API_INTERNAL_URL = '/api';

export const getAllServicesLogs = async ({ offset, limit }: { offset: number, limit: number }): Promise<IApiResponse<IServiceLogOutputDTO[] | null>> => {
    const serviceListUrl = `${API_INTERNAL_URL}/services?offset=${offset}&limit=${limit}`;

    const serviceListResponse = await fetch(serviceListUrl, {
        method: "GET"
    });

    if (!serviceListResponse.ok) {
        if (serviceListResponse.status === 404 || serviceListResponse.status === 204) {
            return { success: true, data: null };
        }
        const errorText = await serviceListResponse.text();
        throw new Error(errorText || "Failed to fetch services");
    }

    const { data: servicesData } = await serviceListResponse.json();

    if (!servicesData || servicesData.length === 0) {
        return { success: true, data: [] };
    }

    const logPromises = servicesData.map((service: any) => {
        const logUrl = `${API_INTERNAL_URL}/services/${service.service_id}/service-logs?offset=${offset}&limit=${limit}`;
        return fetch(logUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (!res.ok) {
                return null;
            }
            return res.json();
        }).then(logData => logData?.data || []);
    });

    const allLogsArrays = await Promise.all(logPromises);

    const allLogs = allLogsArrays.flat().filter(log => log !== null);

    return {
        success: true,
        data: allLogs,
        offset,
        limit
    };
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