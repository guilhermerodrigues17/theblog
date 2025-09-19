'use server';

import { verifyLoginSessionFromApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type ImageUploadActionResult = {
  url: string;
  error: string;
};

export async function imageUploadAction(
  formData: FormData,
): Promise<ImageUploadActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await verifyLoginSessionFromApi();

  if (!isAuthenticated) {
    return makeResult({
      error: 'Sua sessão expirou! Refaça o login em outra aba',
    });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  const imageUploadMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

  if (file.size > imageUploadMaxSize) {
    return makeResult({ error: 'Tamanho inválido' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    '/upload',
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;

  return makeResult({ url });
}
