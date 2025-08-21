import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { timestamp, integer } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";


const job_logs = pgTable('job_logs', {
    job_log_id: uuid().primaryKey().defaultRandom(),
    job_id: uuid().references(() => jobs.job_id).notNull(),
    start_at: timestamp({ precision: 3 }).notNull(),
    duration: integer().notNull(),
})

export { job_logs }