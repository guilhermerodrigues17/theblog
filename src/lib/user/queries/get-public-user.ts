import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { PublicUserDataDto, PublicUserDataSchema } from '../schemas';

export async function getPublicUser() {
  const response = await authenticatedApiRequest<PublicUserDataDto>(
    '/user/me',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.success) {
    return undefined;
  }

  return PublicUserDataSchema.parse(response.data);
}
