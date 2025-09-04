import { LoginForm } from '@/components/admin/LoginForm';
import clsx from 'clsx';

export const dynamic = 'force-dynamic';

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
