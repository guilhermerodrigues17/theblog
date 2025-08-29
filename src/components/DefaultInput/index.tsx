import clsx from 'clsx';
import React, { useId } from 'react';

type DefaultInputProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ labelText = '', ...props }: DefaultInputProps) {
  const id = useId();
  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label htmlFor={id} className='text-sm'>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'bg-white outline-0 text-base/tight',
          'ring-2 ring-slate-400 rounded',
          'p-2 transition focus:ring-blue-600',
          'placeholder-slate-300',
          'disabled:bg-slate-200 disabled:text-slate-400',
          'disable:placeholder-slate-300',
          'disabled:cursor-not-allowed',
          'read-only:bg-slate-100',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
