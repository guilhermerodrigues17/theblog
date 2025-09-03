import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { makePostDto } from '@/dto/post/general-dto';
import { postRepository } from '@/repositories/post';
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
  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) notFound();

  const postDto = makePostDto(post);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>Editar post</h1>
      <ManagePostForm mode='update' post={postDto} />
    </div>
  );
}
