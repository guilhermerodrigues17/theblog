import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-static';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postResponse = await findPublicPostBySlugCached(slug);
  if (!postResponse.success) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: postResponse.data.title,
    description: postResponse.data.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
