import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { postgresPostsTable } from './schemas/postgres-schemas';
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { getDbInstance, postgresDb, sqliteDb } from '.';
import { sqlitePostsTable } from './schemas/sqlite-schemas';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: false,
});

const drizzleSeed: typeof sqliteDb | typeof postgresDb = getDbInstance();

async function seed() {
  const jsonRepository = new JsonPostRepository();
  const posts = await jsonRepository.findAll();

  //Reset database seeding
  try {
    if (drizzleSeed instanceof NodePgDatabase) {
      await drizzleSeed.delete(postgresPostsTable); //delete all posts table
      await drizzleSeed.insert(postgresPostsTable).values(posts);
      console.log(
        '[Postgres] Seed completed successfully! Some posts have been added to the database.',
      );
    } else {
      await drizzleSeed.delete(sqlitePostsTable); //delete all posts table
      await drizzleSeed.insert(sqlitePostsTable).values(posts);
      console.log(
        '[Sqlite] Seed completed successfully! Some posts have been added to the database.',
      );
    }
  } catch (e) {
    console.log(e);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seed();
