import z from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid e-mail!"),
    password: z.string("Invalid password!"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;