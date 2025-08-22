
import { z } from 'zod'

export const createServiceJobSchema = z.object({
    group_id: z.string(),
    group_name: z.string(),
    job_id: z.string(),
    job_name: z.string().optional(),
    service_name: z.string(),
    service_description: z.string().optional(),
    service_url: z.string(),
    rate_limit_tolerance: z.number(),
})

export type ICreateJob = z.infer<typeof createServiceJobSchema>;