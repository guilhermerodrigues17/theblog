'use server';

import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  //TODO: check user auth

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  try {
    const postDeleted = await postRepository.deletePost(id);

    revalidateTag('posts');
    revalidateTag(`post-${postDeleted.slug}`);
  } catch (e) {
    console.log(e);
    return {
      error: 'O post não foi encontrado',
    };
  }

  return {
    error: '',
  };
}
