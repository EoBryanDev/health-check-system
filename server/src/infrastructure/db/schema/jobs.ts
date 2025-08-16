import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "./users";
import { integer } from "drizzle-orm/pg-core";


const jobs = pgTable('jobs', {
    job_id: uuid().primaryKey().defaultRandom(),
    group_id: uuid().references(() => groups.group_id, {
        onDelete: 'set null',
        onUpdate: 'cascade'
    }).notNull(),
    job_name: text().notNull(),
    job_description: text(),
    interval_time: integer(), // in miliseconds
    active: boolean().notNull().default(true),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp(),
    created_by: uuid().references(() => users.user_id).notNull()

})

export { jobs }