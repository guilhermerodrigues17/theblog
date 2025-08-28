import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostDetails } from '../PostDetails';
import { ErrorMessage } from '../ErrorMessage';

export async function FeaturedPost() {
  const posts = await findAllPublicPostsCached();
  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle='Ops.' content='Nenhum post foi encontrado.' />
    );
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
