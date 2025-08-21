import { PostCoverImage } from '../PostCoverImage';
import { PostDetails } from '../PostDetails';

export function FeaturedPost() {
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        alt='Post image'
        href='#'
        src='/images/bryen_9.png'
        width={1200}
        height={720}
        priority={true}
      />

      <PostDetails
        createdAt='2025-08-19T00:00:00.000Z'
        postLink='#'
        title='Lorem ipsum dolor sit amet consectetur'
        excerpt='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae optio
          facere nobis rerum provident ea. Natus nam debitis commodi provident
          omnis maiores nostrum rem sed, quos dolores consectetur nisi dicta!'
        as='h1'
      />
    </section>
  );
}
