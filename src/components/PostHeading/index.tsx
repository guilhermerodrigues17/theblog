import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: HTag = 'h2',
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: 'text-2xl sm:text-4xl font-extrabold',
    h2: 'text-xl font-bold',
  };

  return (
    <HTag className={clsx(headingClassesMap[HTag])}>
      <Link className='hover:text-slate-600 transition' href={url}>
        {children}
      </Link>
    </HTag>
  );
}
