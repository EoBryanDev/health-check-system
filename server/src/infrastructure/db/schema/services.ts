import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { groups } from './groups';
import { users } from './users';
import { integer } from 'drizzle-orm/pg-core';
import { jobs } from './jobs';
import { relations } from 'drizzle-orm';

const services = pgTable('services', {
  service_id: uuid().primaryKey().defaultRandom(),
  group_id: uuid()
    .references(() => groups.group_id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  job_id: uuid().references(() => jobs.job_id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  service_name: text().notNull(),
  service_description: text(),
  service_url: text().notNull(),
  rate_limit_tolerance: integer().notNull(), // in miliseconds
  last_run: timestamp(), // in seconds
  active: boolean().notNull().default(true),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  created_by: uuid()
    .references(() => users.user_id)
    .notNull(),
});

export const servicesRelations = relations(services, ({ one }) => ({
  group: one(groups, {
    fields: [services.group_id],
    references: [groups.group_id],
  }),
  job: one(jobs, {
    fields: [services.job_id],
    references: [jobs.job_id],
  }),
}));

export { services };
