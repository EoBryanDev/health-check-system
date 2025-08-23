import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { groups } from './groups';
import { relations } from 'drizzle-orm';

const group_users = pgTable('group_users', {
  group_id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .references(() => users.user_id, {
      onDelete: 'cascade',
    })
    .notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(group_users),
}));

export const groupUsersRelations = relations(group_users, ({ one }) => ({
  group: one(groups, {
    fields: [group_users.group_id],
    references: [groups.group_id],
  }),
  user: one(users, {
    fields: [group_users.user_id],
    references: [users.user_id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(group_users),
}));

export { group_users };
