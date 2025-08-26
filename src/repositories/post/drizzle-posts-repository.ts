import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { db } from '@/db/drizzle';

export class DrizzlePostsRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await db.query.postsTable.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error('resource not found');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await db.query.postsTable.findMany();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await db.query.postsTable.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error('resource not found');

    return post;
  }
}
