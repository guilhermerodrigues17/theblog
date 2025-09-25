'use server';

import { createLoginSessionFromApi } from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { getZodMessageError } from '@/utils/get-zod-error-message';
import { verifyIsBot } from '@/utils/verify-is-bot';
import { redirect } from 'next/navigation';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(
  state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const isBot = await verifyIsBot(formData);
  if (isBot) {
    return {
      email: '',
      errors: ['error'],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  const loginFormObj = Object.fromEntries(formData.entries());
  const formEmail = loginFormObj?.email?.toString() || '';
  const loginData = LoginSchema.safeParse(loginFormObj);

  if (!loginData.success) {
    return {
      email: formEmail,
      errors: getZodMessageError(loginData.error),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect('/admin/post');
}
