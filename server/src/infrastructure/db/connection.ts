import postgres from 'postgres';
import { env } from '../../env';
import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from './schema';

export const sql = postgres(env.POSTGRES_URL);
export const db = drizzle(sql, {
  schema,
  casing: 'snake_case',
});
