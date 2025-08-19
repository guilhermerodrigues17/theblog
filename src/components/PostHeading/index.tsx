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
    h1: 'text-2xl sm:text-4xl',
    h2: 'text-xl sm:text-4xl',
  };

  const commonClasses = 'font-extrabold';

  return (
    <HTag className={clsx(headingClassesMap[HTag], commonClasses)}>
      <Link href={url}>{children}</Link>
    </HTag>
  );
}
