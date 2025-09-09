import 'dotenv/config';
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { postgresPostsTable } from './schemas/postgres-schemas';
import { Pool } from 'pg';
import Database from 'better-sqlite3';
import { sqlitePostsTable } from './schemas/sqlite-schemas';

const dbProvider = process.env.DATABASE_PROVIDER || 'pg';
const pgDbUrl = process.env.DATABASE_URL || '';

const pgPool = new Pool({
  connectionString: pgDbUrl,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

const sqlite = new Database(
  process.env.DATABASE_FILENAME_SQLITE || 'sqlite.db',
);

export const sqliteDb = drizzleSqlite({
  client: sqlite,
  schema: { postsTable: sqlitePostsTable },
});

export const postgresDb = drizzlePostgres(pgPool, {
  schema: { postsTable: postgresPostsTable },
});

export function getDbInstance() {
  return dbProvider === 'pg' ? postgresDb : sqliteDb;
}
