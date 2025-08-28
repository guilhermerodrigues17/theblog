'use client';

import clsx from 'clsx';
import React from 'react';

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
};

export function ErrorMessage({
  pageTitle = '',
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <div>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          'min-h-[320px] bg-slate-900 text-slate-100',
          'p-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-7xl/tight font-bold mb-4'>{contentTitle}</h1>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
