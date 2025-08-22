import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string(),
    cellnumber: z.string().optional(),
})

export type Createuser = z.infer<typeof createUserSchema>;