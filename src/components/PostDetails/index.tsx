import React from 'react';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';

type PostDetailsProps = {
  createdAt: string;
  postLink: string;
  title: string;
  excerpt: string;
} & Pick<React.ComponentProps<typeof PostHeading>, 'as'>;

export function PostDetails({
  createdAt,
  postLink,
  title,
  excerpt,
  as,
}: PostDetailsProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <PostDate dateTime={createdAt} />

      <PostHeading as={as} url={postLink}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
