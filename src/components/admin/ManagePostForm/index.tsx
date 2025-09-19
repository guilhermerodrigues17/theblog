'use client';

import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { InputCheckbox } from '@/components/InputCheckbox';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { createPostAction } from '@/actions/post/create-post-action';
import { toast } from 'react-toastify';
import { updatePostAction } from '@/actions/post/update-post-action';
import { useRouter, useSearchParams } from 'next/navigation';
import { PublicPostDto, PublicPostSchema } from '@/lib/post/schemas';

type ManagePostCreateFormProps = {
  mode: 'create';
};

type ManagePostUpdateFormProps = {
  mode: 'update';
  post: PublicPostDto;
};

type ManagePostFormProps =
  | ManagePostCreateFormProps
  | ManagePostUpdateFormProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  let post;
  if (mode === 'update') {
    post = props.post;
  }

  const searchParams = useSearchParams();
  const createdParam = searchParams.get('created');
  const router = useRouter();

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: PublicPostSchema.parse(post || {}),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state]);

  useEffect(() => {
    if (createdParam === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [createdParam, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(post?.content || '');

  return (
    <form action={action}>
      <div className='flex flex-col gap-6 mb-8'>
        <DefaultInput
          type='text'
          labelText='ID'
          placeholder='ID gerado automaticamente'
          name='id'
          readOnly
          defaultValue={formState.id}
          disabled={isPending}
        />

        <DefaultInput
          type='text'
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          defaultValue={formState.slug}
          disabled={isPending}
        />

        <DefaultInput
          type='text'
          labelText='Título'
          placeholder='Escreva um título para o seu post...'
          name='title'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <DefaultInput
          type='text'
          labelText='Resumo'
          placeholder='Escreva um resumo para o seu post...'
          name='excerpt'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <DefaultInput
          type='text'
          labelText='URL da imagem de capa'
          placeholder='Escreva a url da imagem'
          name='coverImageUrl'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        {mode === 'update' && (
          <InputCheckbox
            type='checkbox'
            labelText='Publicar?'
            name='published'
            defaultChecked={formState.published}
            disabled={isPending}
          />
        )}

        <div className='mt-6'>
          <DefaultButton type='submit' disabled={isPending}>
            Enviar
          </DefaultButton>
        </div>
      </div>
    </form>
  );
}
