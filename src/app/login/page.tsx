import { LoginForm } from '@/components/admin/LoginForm';
import clsx from 'clsx';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'max-w-sm mt-16 mx-auto',
      )}
    >
      <LoginForm />
    </div>
  );
}
