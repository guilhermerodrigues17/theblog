'use client';

import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { InputCheckbox } from '@/components/InputCheckbox';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState('');
  return (
    <form action=''>
      <div className='flex flex-col gap-6'>
        <DefaultInput labelText='Nome' placeholder='Digite...' />
        <DefaultInput labelText='Sobrenome' placeholder='Digite...' />

        <ImageUploader />

        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <InputCheckbox labelText='Selecionar' />

        <div className='mt-6'>
          <DefaultButton type='submit'>Enviar</DefaultButton>
        </div>
      </div>
    </form>
  );
}
