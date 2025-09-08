import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { postsTable } from './schemas';
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: false,
});

const drizzleSeed = drizzle(pool, { schema });

async function seed() {
  const jsonRepository = new JsonPostRepository();
  const posts = await jsonRepository.findAll();

  //Reset database seeding
  try {
    await drizzleSeed.delete(postsTable); //delete all posts table
    await drizzleSeed.insert(postsTable).values(posts);
    console.log(
      'Seed completed successfully! Some posts have been added to the database.',
    );
  } catch (e) {
    console.log(e);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seed();
