import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { services } from './services';
import { EMethods } from './EMethods';
import { EClassifications } from './EClassifications';
import { relations } from 'drizzle-orm';

const service_logs = pgTable('service_logs', {
  service_log_id: uuid().primaryKey().defaultRandom(),
  service_id: uuid().notNull(),
  start_at: timestamp({ precision: 3 }).notNull(),
  duration: integer().notNull(),
  method: EMethods('method').notNull().default('JOB'),
  status_code: integer().notNull(),
  requester: text().notNull().default('NODE_CRON'),
  device: text().notNull().default('SERVER'),
  classification: EClassifications('classification').notNull(),
});

export const serviceLogsRelations = relations(service_logs, ({ one }) => ({
  service: one(services, {
    fields: [service_logs.service_id],
    references: [services.service_id],
  }),
}));

export { service_logs };
