import { PostCoverImage } from '../PostCoverImage';
import { PostDetails } from '../PostDetails';
import { findAllPublicPosts } from '@/lib/post/queries';

export async function PostsList() {
  const posts = await findAllPublicPosts();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col gap-4 mb-4 group' key={post.id}>
            <PostCoverImage
              href={postLink}
              alt={post.title}
              src={post.coverImageUrl}
              width={1200}
              height={720}
            />

            <PostDetails
              createdAt={post.createdAt}
              postLink={postLink}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
