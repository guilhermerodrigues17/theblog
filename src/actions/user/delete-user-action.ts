'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getPublicUser } from '@/lib/user/queries/get-public-user';
import { PublicUserDataDto } from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { logoutAction } from '../login/logout-action';

type DeleteUserActionState = {
  errors: string[];
  success: boolean;
};

export async function deleteUserAction(): Promise<DeleteUserActionState> {
  const user = await getPublicUser();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: [],
      success: false,
    };
  }

  const deleteResponse = await authenticatedApiRequest<PublicUserDataDto>(
    '/user/me',
    {
      method: 'DELETE',
    },
  );

  if (!deleteResponse.success) {
    return {
      errors: deleteResponse.errors,
      success: false,
    };
  }

  await logoutAction();

  return {
    errors: [],
    success: true,
  };
}
