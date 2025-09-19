'use server';

import { verifyLoginSessionFromApi } from '@/lib/login/manage-login';
import { PublicPostDto } from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSessionFromApi();

  if (!isAuthenticated) {
    return {
      error: 'Sua sessão expirou! Refaça o login em outra aba',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostDto>(
    `/post/me/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!deletePostResponse.success) {
    return {
      error: 'Erro ao apagar o post',
    };
  }

  const responseData = deletePostResponse.data;

  revalidateTag('posts');
  revalidateTag(`post-${responseData.slug}`);

  return {
    error: '',
  };
}
