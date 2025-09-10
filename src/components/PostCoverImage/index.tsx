import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PostCoverImageProps = {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  linkClassName?: string;
  imageClassName?: string;
};

export function PostCoverImage({
  href,
  src,
  alt,
  width,
  height,
  priority = false,
  linkClassName = '',
  imageClassName = '',
}: PostCoverImageProps) {
  return (
    <Link
      className={clsx('w-full', 'overflow-hidden', 'rounded-xl', linkClassName)}
      href={href}
    >
      <Image
        className={clsx(
          'w-full',
          'h-full',
          'aspect-[4/3]',
          'object-cover',
          'object-center',
          'group-hover:scale-105',
          'transition',
          imageClassName,
        )}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </Link>
  );
}
