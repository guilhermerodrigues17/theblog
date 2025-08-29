import { ManagePostForm } from '@/components/admin/ManagePostForm';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <>
      <h1 className='mb-6 text-xl font-bold'>Criar post</h1>
      <ManagePostForm />
    </>
  );
}
