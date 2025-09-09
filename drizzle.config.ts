import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbProvider = process.env.DATABASE_PROVIDER || 'pg';

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema:
    dbProvider === 'pg'
      ? './src/db/drizzle/schemas/postgres-schemas.ts'
      : './src/db/drizzle/schemas/sqlite-schemas.ts',
  dialect: dbProvider === 'pg' ? 'postgresql' : 'sqlite',
  dbCredentials:
    dbProvider === 'pg'
      ? {
          url: process.env.DATABASE_URL!,
        }
      : { url: process.env.DATABASE_FILENAME_SQLITE || 'sqlite.db' },
});
