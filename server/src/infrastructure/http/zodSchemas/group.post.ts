import { z } from 'zod'

export const createGroupSchema = z.object({
    group_name: z.string(),
    group_description: z.string().optional(),
    users_email: z.email()
})

export type CreateGroup = z.infer<typeof createGroupSchema>;