// src/services/group.service.ts
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IGroupInputDTO, IGroupOutputDTO } from "@/interfaces/IConfigurations";

const API_INTERNAL_URL = '/api';

export const addGroup = async (item: IGroupInputDTO): Promise<IApiResponse<IGroupOutputDTO>> => {
    const response = await fetch(`${API_INTERNAL_URL}/groups`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create group");
    }

    return response.json();
};

export const getAllGroups = async (): Promise<IApiResponse<IGroupOutputDTO[] | null>> => {
    const response = await fetch(`${API_INTERNAL_URL}/groups`, {
        method: "GET"
    });

    if (!response.ok) {
        const error = await response.json();
        return { success: false, data: null, error: error.message };
    }

    if (response.status === 204) {
        return { success: true, data: null };
    }

    return response.json();
};