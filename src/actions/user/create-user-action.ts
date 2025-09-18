'use server';

import {
  CreateUserSchema,
  PublicUserDataDto,
  PublicUserDataSchema,
} from '@/lib/user/schemas';
import { apiRequest } from '@/utils/api-request';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { redirect } from 'next/navigation';

type CreateUserActionState = {
  user: PublicUserDataDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserDataSchema.parse(formObj),
      errors: getZodMessageError(parsedFormData.error),
      success: false,
    };
  }

  const apiResponse = await apiRequest<PublicUserDataDto>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!apiResponse.success) {
    return {
      user: PublicUserDataSchema.parse(formObj),
      errors: apiResponse.errors,
      success: apiResponse.success,
    };
  }

  redirect('/login?created=1');
}
