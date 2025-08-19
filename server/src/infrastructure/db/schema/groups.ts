import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";


const groups = pgTable('groups', {
    group_id: uuid().primaryKey().defaultRandom(),
    group_name: text().notNull().unique(),
    group_description: text(),
    active: boolean().notNull().default(true),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp(),
    created_by: uuid().references(() => users.user_id).notNull()

})

export { groups }