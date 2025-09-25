import { ChangePasswordForm } from '@/components/admin/ChangePasswordForm';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Mudar senha',
};

export default async function AdminChangePasswordPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <ChangePasswordForm />
    </Suspense>
  );
}
