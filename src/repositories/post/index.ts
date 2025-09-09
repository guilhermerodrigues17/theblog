import { PostRepository } from './post-repository';
import { PostgresPostsRepository } from './postgres-posts-repository';
import { SqlitePostsRepository } from './sqlite-posts-repository';

const dbProvider = process.env.DATABASE_PROVIDER || 'pg';

export const postRepository = createPostRepository();

function createPostRepository(): PostRepository {
  return dbProvider === 'pg'
    ? new PostgresPostsRepository()
    : new SqlitePostsRepository();
}
