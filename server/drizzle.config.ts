import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/infrastructure/db/schema/**.ts',
  out: './src/infrastructure/db/migrations',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
});
