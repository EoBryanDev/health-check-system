import { z } from 'zod';

export const editServiceSchema = z.object({
  service_id: z.string(),
  group_id: z.string(),
  group_name: z.string().optional(),
  active: z.boolean().optional(),
  job_id: z.string().optional(),
  job_name: z.string().optional(),
  last_run: z.date().nullable().optional(),
  service_name: z.string(),
  service_description: z.string().optional(),
  service_url: z.string(),
  rate_limit_tolerance: z.number(),
});

export type IEditServiceSchema = z.infer<typeof editServiceSchema>;
