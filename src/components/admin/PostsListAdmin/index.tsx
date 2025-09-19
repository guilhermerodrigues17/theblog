import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostBtn } from '../DeletePostBtn';
import { ErrorMessage } from '@/components/ErrorMessage';

export default async function PostsListAdmin() {
  const postsResponse = await findAllPostsAdmin();

  if (!postsResponse.success) {
    console.log(postsResponse.errors);
    return (
      <ErrorMessage contentTitle='🤔' content='Tente fazer login novamente' />
    );
  }

  const posts = postsResponse.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage
        contentTitle='📝'
        content='Você ainda não escreveu nenhum post...'
      />
    );
  }

  return (
    <div className='flex flex-col gap-4 mb-8'>
      {posts.map(post => {
        return (
          <div
            key={post.id}
            className={clsx(
              'p-2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between',
            )}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-xs text-slate-600 italic'>
                (Não publicado)
              </span>
            )}

            <DeletePostBtn id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
