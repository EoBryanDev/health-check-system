interface IService {
  service_id?: string;
  group_id: string;
  job_id?: string;
  service_name: string;
  service_description?: string;
  service_url: string;
  rate_limit_tolerance: number; // in miliseconds
  last_run?: string | null;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by: string;
}

export { IService };
