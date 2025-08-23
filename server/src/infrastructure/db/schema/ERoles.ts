import { pgEnum } from 'drizzle-orm/pg-core';

const ERoles = pgEnum('eroles', ['ADMIN', 'MANAGER', 'ANALYST']);

export { ERoles };
