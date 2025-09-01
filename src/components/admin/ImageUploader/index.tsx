'use client';

import { imageUploadAction } from '@/actions/upload/image-upload-action';
import { DefaultButton } from '@/components/DefaultButton';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleChooseFile() {
    toast.dismiss();

    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.item(0);

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Arquivo muito grande. Tamanho máximo: ${readableMaxSize}KB`);

      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await imageUploadAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        return;
      }

      toast.success(result.url);
    });
  }

  return (
    <div className='flex flex-col gap-3 py-4'>
      <DefaultButton
        onClick={handleChooseFile}
        type='button'
        className='self-start'
      >
        <ImageUpIcon />
        Escolha uma imagem
      </DefaultButton>

      <input
        ref={fileInputRef}
        onChange={handleChange}
        type='file'
        name='file'
        accept='image/*'
        className='hidden'
      />
    </div>
  );
}
