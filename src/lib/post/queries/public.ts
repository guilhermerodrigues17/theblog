import { ExternalPostModel } from '@/models/post/post-model';
import { apiRequest } from '@/utils/api-request';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(async () => {
  const postsResponse = await apiRequest<ExternalPostModel[]>('/post', {
    method: 'GET',
    next: {
      tags: ['posts'],
      revalidate: 86400,
    },
  });

  return postsResponse;
});

export const findPublicPostBySlugCached = cache(async (slug: string) => {
  const postsResponse = await apiRequest<ExternalPostModel>(`/post/${slug}`, {
    method: 'GET',
    next: {
      tags: [`post-${slug}`],
      revalidate: 86400,
    },
  });

  return postsResponse;
});
