import * as z from "zod";

export const groupSchema = z.object({
    group_name: z.string().min(1, "Group name is required."),
    group_description: z.string().optional(),
    users_email: z.string().email("Invalid email format.").min(1, "Email is required."),
});

export const jobSchema = z.object({
    group_id: z.string().min(1, "Group ID is required."),
    group_name: z.string().min(1, "Group name is required."),
    job_name: z.string().min(1, "Job name is required."),
    job_description: z.string().optional(),
    interval_time: z.number().int().min(1000, "Interval must be at least 1000ms."),
});

export const serviceSchema = z.object({
    group_id: z.string().min(1, "Group ID is required."),
    group_name: z.string().min(1, "Group name is required."),
    job_id: z.string().optional(),
    job_name: z.string().optional(),
    last_run: z.date().nullable().optional(),
    service_name: z.string().min(1, "Service name is required."),
    service_description: z.string().optional(),
    service_url: z.string().url("Invalid URL.").min(1, "URL is required."),
    rate_limit_tolerance: z.number().int().nonnegative("Tolerance cannot be negative."),
});

export type TGroupSchema = z.infer<typeof groupSchema>;
export type TJobSchema = z.infer<typeof jobSchema>;
export type TServiceSchema = z.infer<typeof serviceSchema>;