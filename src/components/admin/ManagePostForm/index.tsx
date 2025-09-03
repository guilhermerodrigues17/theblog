'use client';

import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { InputCheckbox } from '@/components/InputCheckbox';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { makePartialPostDto, PostDto } from '@/dto/post/general-dto';
import { createPostAction } from '@/actions/post/create-post-action';
import { toast } from 'react-toastify';

type ManagePostFormProps = {
  post?: PostDto;
};

export function ManagePostForm({ post }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPostDto(post),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(post?.content || '');

  return (
    <form action={action}>
      <div className='flex flex-col gap-6'>
        <DefaultInput
          type='text'
          labelText='ID'
          placeholder='ID gerado automaticamente'
          name='id'
          readOnly
          defaultValue={formState.id}
        />

        <DefaultInput
          type='text'
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          defaultValue={formState.slug}
        />

        <DefaultInput
          type='text'
          labelText='Autor'
          placeholder='Escreva o nome do autor do post...'
          name='author'
          defaultValue={formState.author}
        />

        <DefaultInput
          type='text'
          labelText='Título'
          placeholder='Escreva um título para o seu post...'
          name='title'
          defaultValue={formState.title}
        />

        <DefaultInput
          type='text'
          labelText='Resumo'
          placeholder='Escreva um resumo para o seu post...'
          name='excerpt'
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={false}
        />

        <ImageUploader />

        <DefaultInput
          type='text'
          labelText='URL da imagem de capa'
          placeholder='Escreva a url da imagem'
          name='coverImageUrl'
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          type='checkbox'
          labelText='Publicar?'
          name='published'
          defaultChecked={formState.published}
        />

        <div className='mt-6'>
          <DefaultButton type='submit'>Enviar</DefaultButton>
        </div>
      </div>
    </form>
  );
}
