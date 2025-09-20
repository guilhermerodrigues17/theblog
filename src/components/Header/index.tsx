import clsx from 'clsx';
import Link from 'next/link';
import { ManageUserMenu } from '../ManageUserMenu';
import { verifyLoginSessionFromApi } from '@/lib/login/manage-login';

export async function Header() {
  const isAuthenticated = await verifyLoginSessionFromApi();

  return (
    <header className='flex justify-between items-center mb-6 py-8'>
      <h1
        className={clsx(
          'text-4xl/normal font-extrabold ',
          'sm:text-5xl/normal sm:py-10',
          'md:text-6xl/normal md:py-11',
          'lg:text-7xl/normal lg:py-12',
        )}
      >
        <Link href='/'>The Blog</Link>
      </h1>

      <ManageUserMenu isAuthenticated={!!isAuthenticated} />
    </header>
  );
}
