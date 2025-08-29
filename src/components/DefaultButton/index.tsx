'use client';

import clsx from 'clsx';
import React from 'react';

type ButtonVariants = 'default' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

type DefaultButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function DefaultButton({
  children,
  variant = 'default',
  size = 'md',
  ...props
}: DefaultButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx('bg-blue-600 hover:bg-blue-700 text-blue-100'),
    ghost: clsx('bg-slate-200 hover:bg-slate-300 text-slate-950'),
    danger: clsx('bg-red-600 hover:bg-red-700 text-red-100'),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx('text-xs/tight py-1 px-2 gap-1 [&_svg]:w-4 [&_svg]:h-4'),
    md: clsx('text-base/tight py-2 px-4 gap-2 [&_svg]:w-5 [&_svg]:h-5'),
    lg: clsx('text-lg/tight py-4 px-6 gap-3 [&_svg]:w-6 [&_svg]:h-6'),
  };

  const buttonStyles = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    'rounded-lg transition cursor-pointer',
    'flex items-center justify-center',
    'disabled:bg-slate-200 disabled:text-slate-400',
    'disabled:cursor-not-allowed',
    props.className,
  );

  return (
    <button {...props} className={buttonStyles}>
      {children}
    </button>
  );
}
