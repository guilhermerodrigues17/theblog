import PostsListAdmin from '@/components/PostsListAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostsListAdmin />
    </Suspense>
  );
}
