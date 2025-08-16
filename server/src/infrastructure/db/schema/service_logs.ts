import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { services } from "./services";
import { EMethods } from "./EMethods";
import { EClassifications } from "./EClassifications";


const service_logs = pgTable('service_logs', {
    service_log_id: uuid().primaryKey().defaultRandom(),
    service_id: uuid().references(() => services.service_id).notNull(),
    start_at: timestamp({ precision: 3 }).notNull(),
    duration: timestamp({ precision: 3 }).notNull(),
    method: EMethods('method').notNull().default('JOB'),
    status_code: integer().notNull(),
    requester: text().notNull().default('NODE_CRON'),
    device: text().notNull().default('SERVER'),
    classification: EClassifications('classification').notNull()

})

export { service_logs }