import clsx from 'clsx';

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className = '' }: SpinLoaderProps) {
  const spinStyles = clsx(
    'w-10',
    'h-10',
    'border-5',
    'border-t-transparent',
    'border-slate-900',
    'rounded-full',
    'animate-spin',
  );

  const containerStyles = clsx(
    'flex',
    'justify-center',
    'items-center',
    className,
  );

  return (
    <div className={containerStyles}>
      <div className={spinStyles}></div>
    </div>
  );
}
