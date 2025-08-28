import { MenuAdmin } from '@/components/admin/MenuAdmin';

export default function AdminPostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
