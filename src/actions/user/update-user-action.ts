'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getPublicUser } from '@/lib/user/queries/get-public-user';
import {
  PublicUserDataDto,
  PublicUserDataSchema,
  UpdateUserSchema,
} from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { logoutAction } from '../login/logout-action';

type UpdateUserActionState = {
  user: PublicUserDataDto;
  errors: string[];
  success: boolean;
};

export async function updateUserAction(
  state: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const user = await getPublicUser();

  if (!user) {
    await deleteLoginSession();

    return {
      user: state.user,
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserDataSchema.parse(formObj),
      errors: getZodMessageError(parsedFormData.error),
      success: false,
    };
  }

  const updateResponse = await authenticatedApiRequest<PublicUserDataDto>(
    '/user/me',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!updateResponse.success) {
    return {
      user: PublicUserDataSchema.parse(formObj),
      errors: updateResponse.errors,
      success: updateResponse.success,
    };
  }

  if (user.email !== updateResponse.data.email) {
    await logoutAction('/login?userChanged=1');
  }

  return {
    user: PublicUserDataSchema.parse(updateResponse.data),
    errors: [''],
    success: true,
  };
}
