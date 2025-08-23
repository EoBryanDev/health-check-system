import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { timestamp, integer } from 'drizzle-orm/pg-core';
import { jobs } from './jobs';
import { relations } from 'drizzle-orm';

const job_logs = pgTable('job_logs', {
  job_log_id: uuid().primaryKey().defaultRandom(),
  job_id: uuid()
    .references(() => jobs.job_id)
    .notNull(),
  start_at: timestamp({ precision: 3 }).notNull(),
  duration: integer().notNull(),
});

export const jobLogsRelations = relations(job_logs, ({ one }) => ({
  job: one(jobs, {
    fields: [job_logs.job_id],
    references: [jobs.job_id],
  }),
}));

export { job_logs };
