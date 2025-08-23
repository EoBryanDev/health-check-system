import { pgEnum } from 'drizzle-orm/pg-core';

const EMethods = pgEnum('emethods', ['HTTP', 'JOB']);

export { EMethods };
