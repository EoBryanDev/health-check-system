import { z } from 'zod'

export const LoginUserSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export type ILoginUser = z.infer<typeof LoginUserSchema>;