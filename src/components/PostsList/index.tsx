import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostDetails } from '../PostDetails';

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => {
        return (
          <div className='flex flex-col gap-4 mb-4 group' key={post.id}>
            <PostCoverImage
              href={`/post/${post.slug}`}
              alt={post.title}
              src={post.coverImageUrl}
              width={1200}
              height={720}
            />

            <PostDetails
              createdAt={post.createdAt}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
