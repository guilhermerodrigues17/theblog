'use server';

import { verifyLoginSessionFromApi } from '@/lib/login/manage-login';
import {
  PublicPostDto,
  PublicPostSchema,
  UpdatePostSchema,
} from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPostDto;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifyLoginSessionFromApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id');
  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePostSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      errors: ['Sua sessão expirou! Refaça o login em outra aba'],
      formState: PublicPostSchema.parse(formDataToObj),
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodMessageError(zodParsedObj.error);
    return {
      errors,
      formState: PublicPostSchema.parse(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const updateData = {
    ...validPostData,
  };

  const updatePostResponse = await authenticatedApiRequest<PublicPostDto>(
    `/post/me/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    },
  );

  if (!updatePostResponse.success) {
    return {
      formState: PublicPostSchema.parse(formDataToObj),
      errors: updatePostResponse.errors,
    };
  }

  const updatedPost = updatePostResponse.data;

  revalidateTag('posts');
  revalidateTag(`post-${updatedPost.slug}`);

  return {
    formState: PublicPostSchema.parse(updatedPost),
    errors: [],
    success: true,
  };
}
