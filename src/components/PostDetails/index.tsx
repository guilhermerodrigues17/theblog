import React from 'react';
import { PostHeading } from '../PostHeading';
import { formatDatetime, formatRelativeDate } from '@/utils/format-datetime';

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
      <time
        className='text-slate-600 block text-sm/tight'
        dateTime={createdAt}
        title={formatRelativeDate(createdAt)}
      >
        {formatDatetime(createdAt)}
      </time>

      <PostHeading as={as} url={postLink}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
