import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  out: './apps/backend/web-app-api/src/db/migrations',
  schema: './apps/backend/web-app-api/src/db/schema.ts',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    password: process.env.DB_PASS || '',
    user: process.env.DB_USER || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || 'localhost',
    ssl: false,
  },
});
