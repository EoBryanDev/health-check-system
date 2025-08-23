import { pgEnum } from 'drizzle-orm/pg-core';

const EClassifications = pgEnum('eclassifications', [
  'GOOD',
  'WARNING',
  'ERROR',
]);

export { EClassifications };
