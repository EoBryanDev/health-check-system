import z from "zod";

export const signUpSchema = z
    .object({
        first_name: z.string("Invalid first name").trim().min(2, "Invalid first name"),
        last_name: z.string("Invalid last name").trim().min(2, "Invalid last name"),
        email: z.email("Invalid email"),
        cellnumber: z.string(""),
        password: z.string("Invalid password").min(8, "Invalid password"),
        passwordConfirmation: z.string("Invalid password"),
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirmation;
        },
        {
            error: "Passwords doesn't match",
            path: ["passwordConfirmation"],
        },
    );

export type TSignUpSchema = z.infer<typeof signUpSchema>;