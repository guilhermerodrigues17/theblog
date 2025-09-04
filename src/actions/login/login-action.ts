'use server';

import { verifyPassword } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o nome de usuário e a senha...',
    };
  }

  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = verifyPassword(
    password,
    process.env.LOGIN_PASSWORD || '',
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Nome de usuário ou senha inválidos!',
    };
  }

  return {
    username: '',
    error: '',
  };
}
