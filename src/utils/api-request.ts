type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestSuccess<T> | ApiRequestError;

export const apiUrl = process.env.API_URL || 'http://localhost:3001';

export async function apiRequest<T>(
  path: string,
  options: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${apiUrl}${path}`;
  try {
    const response = await fetch(url, options);
    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errors = Array.isArray(json?.message)
        ? json.message
        : [json?.message || 'Erro inesperado'];

      return {
        errors,
        success: false,
        status: response.status,
      };
    }

    return {
      success: true,
      data: json,
      status: response.status,
    };
  } catch (err) {
    console.log(err);

    return {
      errors: ['Erro interno do servidor'],
      success: false,
      status: 500,
    };
  }
}
