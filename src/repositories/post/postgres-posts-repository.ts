import { PostModel, UpdatePostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { asyncDelay } from '@/utils/async-delay';
import { eq } from 'drizzle-orm';
import { postgresDb } from '@/db/drizzle';
import { postgresPostsTable } from '@/db/drizzle/schemas/postgres-schemas';

const responseDelayInMS = Number(process.env.RESPONSE_DELAY_IN_MS) || 0;

export class PostgresPostsRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(responseDelayInMS, true);

    const posts = await postgresDb.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const post = await postgresDb.query.postsTable.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error('resource not found');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(responseDelayInMS, true);

    const posts = await postgresDb.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const post = await postgresDb.query.postsTable.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error('Post não encontrado');

    return post;
  }

  async deletePost(id: string): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const post = await this.findById(id);
    await postgresDb
      .delete(postgresPostsTable)
      .where(eq(postgresPostsTable.id, post.id));

    return post;
  }

  async createPost(post: PostModel): Promise<PostModel> {
    await asyncDelay(responseDelayInMS, true);

    const postExists = await postgresDb.query.postsTable.findFirst({
      where: (postFound, { or, eq }) =>
        or(eq(postFound.id, post.id), eq(postFound.slug, post.slug)),
      columns: { id: true },
    });

    if (postExists) {
      throw new Error('Um post com esse ID ou Slug já existe na base de dados');
    }

    await postgresDb.insert(postgresPostsTable).values(post);
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

    await postgresDb
      .update(postgresPostsTable)
      .set(updateData)
      .where(eq(postgresPostsTable.id, id));

    return {
      ...postFound,
      ...updateData,
    };
  }
}
