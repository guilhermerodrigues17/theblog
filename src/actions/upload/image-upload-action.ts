'use server';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIR,
  IMAGE_UPLOAD_MAX_SIZE,
} from '@/lib/constants';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

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

  const imgExtension = extname(file.name);
  const uniqueImgName = `${Date.now()}${imgExtension}`;

  const uploadDirPath = resolve(process.cwd(), 'public', IMAGE_UPLOAD_DIR);
  await mkdir(uploadDirPath, { recursive: true });

  const fileArrBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrBuffer);

  const fileFullPath = `${uploadDirPath}/${uniqueImgName}`;

  await writeFile(fileFullPath, buffer);

  const url = `${IMAGE_SERVER_URL}/${uniqueImgName}`;

  return makeResult({ url });
}
