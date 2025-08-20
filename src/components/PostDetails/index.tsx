import React from 'react';
import { PostHeading } from '../PostHeading';

type PostDetailsProps = {
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
} & Pick<React.ComponentProps<typeof PostHeading>, 'as'>;

export function PostDetails({
  createdAt,
  slug,
  title,
  excerpt,
  as,
}: PostDetailsProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <time className='text-slate-600 block text-sm/tight' dateTime={createdAt}>
        {createdAt}
      </time>

      <PostHeading as={as} url={`/post/${slug}`}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
