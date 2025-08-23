import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

const general_configs = pgTable('general_configs', {
  config_id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  value: text().notNull(),
  created_by: uuid()
    .references(() => users.user_id)
    .notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
});

export { general_configs };
