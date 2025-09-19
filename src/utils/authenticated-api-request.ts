import { verifyLoginSessionFromApi } from '@/lib/login/manage-login';
import { apiRequest, ApiRequest } from './api-request';

export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  //server-only verification
  if (typeof window !== 'undefined') {
    throw new Error('Esse método só pode ser usado no server side');
  }

  const acessToken = await verifyLoginSessionFromApi();
  if (!acessToken) {
    return {
      success: false,
      errors: ['Usuário não autenticado'],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${acessToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
