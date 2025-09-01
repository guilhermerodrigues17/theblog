'use server';

import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';

type ImageUploadActionResult = {
  url: string;
  error: string;
};

export async function imageUploadAction(
  formData: FormData,
): Promise<ImageUploadActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({ error: 'Tamanho inválido' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  return makeResult({ url: 'url' });
}
