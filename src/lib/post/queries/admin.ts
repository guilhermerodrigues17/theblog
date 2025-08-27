import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const findPostsByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);
