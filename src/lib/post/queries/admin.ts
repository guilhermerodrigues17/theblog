import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';
import { ExternalPostModel } from '@/models/post/post-model';

export const findPostByIdAdmin = cache(async (id: string) => {
  const postResponse = await authenticatedApiRequest<ExternalPostModel>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );
  return postResponse;
});

export const findAllPostsAdmin = cache(async () => {
  const postResponse = await authenticatedApiRequest<ExternalPostModel[]>(
    `/post/me`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );
  return postResponse;
});
