import { z } from 'zod';

export const createJobchema = z.object({
  group_id: z.string(),
  group_name: z.string(),
  job_name: z.string(),
  job_description: z.string().optional(),
  interval_time: z.number(),
});

export type ICreateJob = z.infer<typeof createJobchema>;
