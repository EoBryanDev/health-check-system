import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { services } from './services';
import { jobs } from './jobs';

const groups = pgTable('groups', {
  group_id: uuid().primaryKey().defaultRandom(),
  group_name: text().notNull().unique(),
  group_description: text(),
  active: boolean().notNull().default(true),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  created_by: uuid()
    .references(() => users.user_id)
    .notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  services: many(services), // um grupo tem vários serviços
  jobs: many(jobs), // se existir ligação direta entre jobs e groups
}));

export { groups };
