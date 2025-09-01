'use client';

import { imageUploadAction } from '@/actions/upload/image-upload-action';
import { DefaultButton } from '@/components/DefaultButton';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    toast.dismiss();

    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.item(0);

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Arquivo muito grande. Tamanho máximo: ${readableMaxSize}KB`);

      fileInput.value = '';
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await imageUploadAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      toast.info('Imagem adicionada');
    });
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <DefaultButton
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        disabled={isPending}
      >
        <ImageUpIcon />
        Escolha uma imagem
      </DefaultButton>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>URL: {imgUrl}</p>

          {/* eslint-disable-next-line */}
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}

      <input
        ref={fileInputRef}
        onChange={handleChange}
        type='file'
        name='file'
        accept='image/*'
        className='hidden'
        disabled={isPending}
      />
    </div>
  );
}
