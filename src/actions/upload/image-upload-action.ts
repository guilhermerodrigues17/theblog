'use server';

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

  const imageUploadMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

  if (file.size > imageUploadMaxSize) {
    return makeResult({ error: 'Tamanho inválido' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imgExtension = extname(file.name);
  const uniqueImgName = `${Date.now()}${imgExtension}`;

  const imageUploadDir = process.env.IMAGE_UPLOAD_DIR || 'upload';

  const uploadDirPath = resolve(process.cwd(), 'public', imageUploadDir);
  await mkdir(uploadDirPath, { recursive: true });

  const fileArrBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrBuffer);

  const fileFullPath = `${uploadDirPath}/${uniqueImgName}`;

  await writeFile(fileFullPath, buffer);

  const imageServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/upload';

  const url = `${imageServerUrl}/${uniqueImgName}`;

  return makeResult({ url });
}
