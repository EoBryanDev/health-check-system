import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().startsWith('postgresql://').default(''),
  JWT_SECRET: z.coerce.string(),
  JWT_EXPIRES_INT: z.coerce.number().default(60),
  REDIS_HOST: z.coerce.string(),
  REDIS_PORT: z.coerce.number().default(6379),
});

export const env = envSchema.parse(process.env);
