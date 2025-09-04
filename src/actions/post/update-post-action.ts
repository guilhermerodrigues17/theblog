'use server';

import {
  makePartialPostDto,
  makePostDto,
  PostDto,
} from '@/dto/post/general-dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostUpdateSchema } from '@/lib/post/validations';
import { postRepository } from '@/repositories/post';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PostDto;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifyLoginSession();

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
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      errors: ['Sua sessão expirou! Refaça o login em outra aba'],
      formState: makePartialPostDto(formDataToObj),
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodMessageError(zodParsedObj.error);
    return {
      errors,
      formState: makePartialPostDto(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const updateData = {
    ...validPostData,
  };

  let updatedPost;
  try {
    updatedPost = await postRepository.updatePost(id, updateData);
    revalidateTag('posts');
    revalidateTag(`post-${updatedPost.slug}`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPostDto(updateData),
        errors: [e.message],
      };
    }
    return {
      formState: makePartialPostDto(updateData),
      errors: ['Ocorreu um erro...'],
    };
  }

  return {
    formState: makePostDto(updatedPost),
    errors: [],
    success: true,
  };
}
