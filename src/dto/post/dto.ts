import { PostModel } from '@/models/post/post-model';

export type PostDto = Omit<PostModel, 'updatedAt'>;

export const makePostDto = (post: PostModel): PostDto => {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author,
    excerpt: post.excerpt,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    createdAt: post.createdAt,
    published: post.published,
  };
};

export const makePartialPostDto = (post?: Partial<PostModel>): PostDto => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    author: post?.author || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    published: post?.published || false,
  };
};
