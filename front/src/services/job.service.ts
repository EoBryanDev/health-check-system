
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IJobInputDTO, IJobOutputDTO, IRunJobInputDTO } from "@/interfaces/IJob";
import { IServiceInputDTO } from "@/interfaces/IService";

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


  return { ...response.json(), success: true };
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

  let url;
  if (mode === 'all') {
    url = `${API_INTERNAL_URL}/jobs/${undefined}/run?mode=all`;
  } else if (mode === 'group') {
    if (!id) {
      return {
        success: false,
        data: null,
        error: "ID is required for group mode"
      };
    }
    url = `${API_INTERNAL_URL}/jobs/${id}/run?mode=${mode}`;
  } else {

    if (!id) {
      return {
        success: false,
        data: null,
        error: "ID is required for single mode"
      };
    }
    url = `${API_INTERNAL_URL}/jobs/${id}/run?mode=single`;
  }

  try {
    const response = await fetch(url, { method: "PUT" });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `Request failed with status ${response.status}`
      }));
      return {
        success: false,
        data: null,
        error: error.error || error.message || `Request failed with status ${response.status}`
      };
    }


    if (response.status === 204) {
      return {
        success: true,
        data: { message: "Job executed successfully" },
        error: undefined
      };
    }


    const data = await response.json();
    return data;

  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

export const updateJob = async (item: IJobInputDTO): Promise<IApiResponse<IJobOutputDTO>> => {
  const response = await fetch(`${API_INTERNAL_URL}/jobs`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create jobs");
  }

  return response.json();
};

export const removeJob = async (jobId: string): Promise<void> => {
  const response = await fetch(`${API_INTERNAL_URL}/jobs/${jobId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to remove job.');
  }
};