'use client';

import { imageUploadAction } from '@/actions/upload/image-upload-action';
import { DefaultButton } from '@/components/DefaultButton';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
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

    const imageUploadMaxSize =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

    if (file.size > imageUploadMaxSize) {
      const readableMaxSize = (imageUploadMaxSize / 1024).toFixed(2);
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
        disabled={isPending || disabled}
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
        disabled={isPending || disabled}
      />
    </div>
  );
}
