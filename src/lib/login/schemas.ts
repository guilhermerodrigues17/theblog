import z from 'zod';

export const LoginSchema = z.object({
  email: z.email({ error: 'E-mail inválido' }),
  password: z
    .string()
    .trim()
    .min(6, { error: 'Senha deve conter, no mínimo, 6 caracteres' }),
});
