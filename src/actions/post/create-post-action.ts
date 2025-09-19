'use server';

import { verifyLoginSessionFromApi } from '@/lib/login/manage-login';
import {
  CreatePostSchema,
  PublicPostDto,
  PublicPostSchema,
} from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: PublicPostDto;
  errors: string[];
  success?: true;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await verifyLoginSessionFromApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = CreatePostSchema.safeParse(formDataToObj);

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

  const createPostResponse = await authenticatedApiRequest<PublicPostDto>(
    '/post/me',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validPostData),
    },
  );

  if (!createPostResponse.success) {
    return {
      errors: createPostResponse.errors,
      formState: PublicPostSchema.parse(formDataToObj),
    };
  }

  const newPost = createPostResponse.data;

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
