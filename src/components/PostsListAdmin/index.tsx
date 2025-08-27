import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className='flex flex-col gap-4'>
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

            <button
              className={clsx(
                'text-red-500 cursor-pointer transition',
                '[&_svg]:w-5 [&_svg]:h-5',
                'hover:scale-120 hover:text-red-700',
              )}
              aria-label={`Apagar post: ${post.title}`}
              title='Apagar post'
            >
              <Trash2Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
