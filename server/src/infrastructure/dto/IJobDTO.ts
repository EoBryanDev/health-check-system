import { IServiceOutputDTO } from './IServiceDTO';

interface IJobOutputWServiceDTO {
  job_id: string;
  group_id: string;
  job_name: string;
  job_description?: string;
  services: Array<IServiceOutputDTO> | [];
  interval_time: number; // in miliseconds
  created_at: string;
  created_by: string;
}

interface IJobOutputWServiceAvailableDTO {
  job_id: string;
  group_id: string;
  job_name: string;
  job_description?: string;
  services: Array<IServiceOutputDTO>;
  interval_time: number; // in miliseconds
  created_at: string;
  created_by: string;
}

interface IJobOutputDTO {
  job_id: string;
  group_id: string;
  job_name: string;
  job_description?: string;
  interval_time: number; // in miliseconds
  created_at: string;
  created_by: string;
  updated_at?: string;
  updated_by?: string;
}

interface IJobInputDTO {
  job_id?: string;
  group_id: string;
  group_name?: string;
  job_name: string;
  job_description?: string;
  active?: boolean;
  interval_time: number; // in miliseconds
}

export {
  IJobInputDTO,
  IJobOutputDTO,
  IJobOutputWServiceDTO,
  IJobOutputWServiceAvailableDTO,
};
