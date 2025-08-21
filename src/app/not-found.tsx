import clsx from 'clsx';

export default function NotFoundPage() {
  return (
    <div
      className={clsx(
        'min-h-[320px] bg-slate-900 text-slate-100',
        'p-8 rounded-xl',
        'flex items-center justify-center',
        'text-center',
      )}
    >
      <div>
        <h1 className='text-7xl/tight font-bold mb-4'>404</h1>
        <p>A página que você está tentando acessar não existe!</p>
      </div>
    </div>
  );
}
