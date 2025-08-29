import { z } from 'zod';

export const createServiceSchema = z.object({
  group_id: z.string(),
  group_name: z.string().optional(),
  job_id: z.string().optional(),
  job_name: z.string().optional(),
  last_run: z.date().nullable().optional(),
  service_name: z.string(),
  service_description: z.string().optional(),
  service_url: z.string(),
  rate_limit_tolerance: z.number(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
