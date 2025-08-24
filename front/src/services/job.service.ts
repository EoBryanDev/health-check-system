// src/services/job.service.ts
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IJobInputDTO, IJobOutputDTO, IServiceInputDTO } from "@/interfaces/IConfigurations";
import { IRunJobInputDTO } from "@/interfaces/IJob";

const API_INTERNAL_URL = '/api';

export const createJob = async (jobData: IJobInputDTO): Promise<IApiResponse<IJobOutputDTO>> => {
  const response = await fetch(`${API_INTERNAL_URL}/jobs`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create job");
  }

  return response.json();
};

export const getAllJobs = async (): Promise<IApiResponse<IJobOutputDTO[] | null>> => {
  const response = await fetch(`${API_INTERNAL_URL}/jobs`, {
    method: "GET",
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

export const addServiceToJob = async (jobServiceData: IServiceInputDTO): Promise<IApiResponse<any>> => {
  const response = await fetch(`${API_INTERNAL_URL}/jobs/service`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobServiceData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add service to job");
  }

  return response.json();
};

export const runJob = async (data: IRunJobInputDTO): Promise<IApiResponse<any>> => {
  const { id, mode } = data;
  const url = id
    ? `${API_INTERNAL_URL}/runJob/${id}?mode=${mode}`
    : `${API_INTERNAL_URL}/runJob?mode=${mode}`;

  const response = await fetch(url, { method: "PUT" });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, data: null, error: error.message };
  }

  return response.json();
};
