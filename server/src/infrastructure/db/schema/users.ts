import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { ERoles } from './ERoles';
import { boolean } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  user_id: uuid().primaryKey().defaultRandom(),
  first_name: text().notNull(),
  last_name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  cellnumber: text(),
  role: ERoles('role').notNull().default('ANALYST'),
  active: boolean().notNull().default(true),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
});

export { users };
