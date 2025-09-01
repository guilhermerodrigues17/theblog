import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Criar post',
};

export default async function AdminPostNewPage() {
  return (
    <>
      <h1 className='mb-6 text-xl font-bold'>Criar post</h1>
      <ManagePostForm />
    </>
  );
}
