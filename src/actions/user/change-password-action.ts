'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getPublicUser } from '@/lib/user/queries/get-public-user';
import { UpdatePasswordSchema } from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { logoutAction } from '../login/logout-action';

type ChangePasswordActionState = {
  errors: string[];
  success: boolean;
};

export async function changePasswordAction(
  state: ChangePasswordActionState,
  formData: FormData,
): Promise<ChangePasswordActionState> {
  const user = await getPublicUser();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdatePasswordSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      errors: getZodMessageError(parsedFormData.error),
      success: false,
    };
  }

  const response = await authenticatedApiRequest('/user/me/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!response.success) {
    return {
      errors: response.errors,
      success: response.success,
    };
  }

  await logoutAction('/login?userChanged=1');

  return {
    errors: [],
    success: true,
  };
}
