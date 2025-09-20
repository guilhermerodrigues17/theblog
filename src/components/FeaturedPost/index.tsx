import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostDetails } from '../PostDetails';
import { ErrorMessage } from '../ErrorMessage';

export async function FeaturedPost() {
  const postsResponse = await findAllPublicPostsCached();
  const noPostsFound = (
    <ErrorMessage contentTitle='Ops.' content='Nenhum post foi encontrado.' />
  );

  if (!postsResponse.success) {
    return noPostsFound;
  }

  const posts = postsResponse.data;

  if (posts.length <= 0) {
    return noPostsFound;
  }

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
