import { findAllPublicPostsCached } from '@/lib/post/queries';
import { PostCoverImage } from '../PostCoverImage';
import { PostDetails } from '../PostDetails';

export async function FeaturedPost() {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];
  const postLink = `/post/${post.slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        alt={post.title}
        href={postLink}
        src={post.coverImageUrl}
        width={1200}
        height={720}
        priority={true}
      />

      <PostDetails
        createdAt={post.createdAt}
        postLink={postLink}
        title={post.title}
        excerpt={post.excerpt}
        as='h1'
      />
    </section>
  );
}
