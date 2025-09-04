import { MenuAdmin } from '@/components/admin/MenuAdmin';
import { requireLoginSessionOrRedirect } from '@/lib/login/manage-login';

export default async function AdminPostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireLoginSessionOrRedirect();
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
