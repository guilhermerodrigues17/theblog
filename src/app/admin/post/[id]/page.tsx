import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { PublicPostSchema } from '@/lib/post/schemas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const postsResponse = await findPostByIdAdmin(id);

  if (!postsResponse.success) {
    console.log(postsResponse.errors);
    notFound();
  }

  const publicPost = PublicPostSchema.parse(postsResponse.data);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>Editar post</h1>
      <ManagePostForm mode='update' post={publicPost} />
    </div>
  );
}
