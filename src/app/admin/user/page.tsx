import { UpdateUser } from '@/components/admin/UpdateUser';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Configurações',
};

export default function AdminUserSettingsPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <UpdateUser />
    </Suspense>
  );
}
