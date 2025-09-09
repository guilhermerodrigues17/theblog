import { PostModel, UpdatePostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { asyncDelay } from '@/utils/async-delay';
import { eq } from 'drizzle-orm';
import { sqliteDb } from '@/db/drizzle';
import { sqlitePostsTable } from '@/db/drizzle/schemas/sqlite-schemas';

const responseDelayInMS = Number(process.env.RESPONSE_DELAY_IN_MS) || 0;

export class SqlitePostsRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(responseDelayInMS, true);

    const posts = await sqliteDb.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const post = await sqliteDb.query.postsTable.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error('resource not found');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(responseDelayInMS, true);

    const posts = await sqliteDb.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const post = await sqliteDb.query.postsTable.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error('Post não encontrado');

    return post;
  }

  async deletePost(id: string): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const post = await this.findById(id);
    await sqliteDb
      .delete(sqlitePostsTable)
      .where(eq(sqlitePostsTable.id, post.id));

    return post;
  }

  async createPost(post: PostModel): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const postExists = await sqliteDb.query.postsTable.findFirst({
      where: (postFound, { or, eq }) =>
        or(eq(postFound.id, post.id), eq(postFound.slug, post.slug)),
      columns: { id: true },
    });

    if (postExists) {
      throw new Error('Um post com esse ID ou Slug já existe na base de dados');
    }

    await sqliteDb.insert(sqlitePostsTable).values(post);
    return post;
  }

  async updatePost(
    id: string,
    updatePostData: UpdatePostModel,
  ): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const postFound = await this.findById(id);
    const updatedAt = new Date().toISOString();

    const updateData = {
      ...updatePostData,
      updatedAt,
    };

    await sqliteDb
      .update(sqlitePostsTable)
      .set(updateData)
      .where(eq(sqlitePostsTable.id, id));

    return {
      ...postFound,
      ...updateData,
    };
  }
}
