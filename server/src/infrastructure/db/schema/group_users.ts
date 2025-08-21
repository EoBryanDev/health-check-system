import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";


const group_users = pgTable('group_users', {
    group_id: uuid().primaryKey().defaultRandom(),
    user_id: uuid().references(() => users.user_id, {
        onDelete: 'cascade'
    }).notNull(),
    created_at: timestamp().defaultNow().notNull(),

})

export { group_users }