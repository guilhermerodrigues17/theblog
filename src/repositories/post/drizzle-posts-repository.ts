import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { db } from '@/db/drizzle';
import { asyncDelay } from '@/utils/async-delay';
import { RESPONSE_DELAY_IN_MS } from '@/lib/constants';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

export class DrizzlePostsRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(RESPONSE_DELAY_IN_MS, true);

    const posts = await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(RESPONSE_DELAY_IN_MS, true);

    const post = await db.query.postsTable.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error('resource not found');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(RESPONSE_DELAY_IN_MS, true);

    const posts = await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(RESPONSE_DELAY_IN_MS, true);

    const post = await db.query.postsTable.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error('resource not found');

    return post;
  }

  async deletePost(id: string): Promise<PostModel> {
    await asyncDelay(RESPONSE_DELAY_IN_MS, true);

    const post = await this.findById(id);
    await db.delete(postsTable).where(eq(postsTable.id, post.id));

    return post;
  }

  async createPost(post: PostModel): Promise<PostModel> {
    await asyncDelay(RESPONSE_DELAY_IN_MS, true);

    await db.insert(postsTable).values(post);
    return post;
  }
}
