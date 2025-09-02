'use server';

import { makePartialPostDto, PostDto } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { makeSlugFromTitle } from '@/utils/make-slug-from-title';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type CreatePostActionState = {
  formState: PostDto;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodMessageError(zodParsedObj.error);
    return {
      errors,
      formState: makePartialPostDto(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidv4(),
    slug: makeSlugFromTitle(validPostData.title),
  };

  const createdPost = await postRepository.createPost(newPost);

  revalidateTag('posts');
  redirect(`/admin/post/${createdPost.id}`);
}
