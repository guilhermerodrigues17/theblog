import { MenuAdmin } from '@/components/admin/MenuAdmin';
import { requireLoginSession } from '@/lib/login/manage-login';

export default async function AdminPostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireLoginSession();
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
