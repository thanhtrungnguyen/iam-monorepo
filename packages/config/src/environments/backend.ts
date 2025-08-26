import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DB_PASSWORD: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().default('5432'),
});

export const env = envSchema.parse({
  DB_PASSWORD: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});
