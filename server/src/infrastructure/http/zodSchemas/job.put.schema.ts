import { z } from 'zod';

export const editJobchema = z.object({
  group_id: z.string(),
  job_id: z.uuid(),
  job_name: z.string(),
  job_description: z.string().optional(),
  interval_time: z.number(),
});

export type ICreateJob = z.infer<typeof editJobchema>;
