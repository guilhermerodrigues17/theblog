import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className='bg-slate-100 text-slate-900 min-h-screen'>
      <div className='max-w-screen-lg px-8 mx-auto'>{children}</div>
    </div>
  );
}
