'use client';

import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { InputCheckbox } from '@/components/InputCheckbox';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { PostDto } from '@/dto/post/dto';

type ManagePostFormProps = {
  post?: PostDto;
};

export function ManagePostForm({ post }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(post?.content || '');
  return (
    <form action=''>
      <div className='flex flex-col gap-6'>
        <DefaultInput
          type='text'
          labelText='ID'
          placeholder='ID gerado automaticamente'
          name='id'
          readOnly
          defaultValue={post?.id || ''}
        />

        <DefaultInput
          type='text'
          labelText='Slug'
          placeholder='Slug gerado automaticamente'
          name='slug'
          readOnly
          defaultValue={post?.slug || ''}
        />

        <DefaultInput
          type='text'
          labelText='Autor'
          placeholder='Escreva o nome do autor do post...'
          name='author'
          defaultValue={post?.author || ''}
        />

        <DefaultInput
          type='text'
          labelText='Título'
          placeholder='Escreva um título para o seu post...'
          name='title'
          defaultValue={post?.title || ''}
        />

        <DefaultInput
          type='text'
          labelText='Resumo'
          placeholder='Escreva um resumo para o seu post...'
          name='excerpt'
          defaultValue={post?.excerpt || ''}
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
          defaultValue={post?.coverImageUrl || ''}
        />

        <InputCheckbox
          type='checkbox'
          labelText='Publicar?'
          name='published'
          defaultChecked={post?.published || false}
        />

        <div className='mt-6'>
          <DefaultButton type='submit'>Enviar</DefaultButton>
        </div>
      </div>
    </form>
  );
}
