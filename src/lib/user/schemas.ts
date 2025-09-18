import z from 'zod';

const CreateUserBase = z.object({
  name: z
    .string()
    .trim()
    .min(4, { error: 'Nome deve conter, no mínimo, 4 caracteres' }),
  email: z.email('E-mail inválido'),
  password: z
    .string()
    .trim()
    .min(6, { error: 'Senha deve conter, no mínimo, 6 caracteres' }),
  password2: z.string().trim().min(6, {
    error: 'Confirmação de senha deve conter, no mínimo, 6 caracteres',
  }),
});

export const CreateUserSchema = CreateUserBase.refine(
  data => {
    return data.password === data.password2;
  },
  {
    path: ['password2'],
    error: 'As senhas não batem',
  },
).transform(({ name, email, password }) => {
  return {
    name,
    email,
    password,
  };
});

export const PublicUserDataSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  email: z.string().default(''),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(6, { error: 'Senha deve conter, no mínimo, 6 caracteres' }),
    newPassword: z
      .string()
      .trim()
      .min(6, { error: 'Nova senha deve conter, no mínimo, 6 caracteres' }),
    newPassword2: z.string().trim().min(6, {
      error: 'Confirmação de senha deve conter, no mínimo, 6 caracteres',
    }),
  })
  .refine(
    data => {
      return data.newPassword === data.newPassword2;
    },
    {
      path: ['newPassword2'],
      error: 'As senhas não batem',
    },
  )
  .transform(({ currentPassword, newPassword }) => {
    return {
      currentPassword,
      newPassword,
    };
  });

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  password2: true,
}).extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
export type PublicUserDataDto = z.infer<typeof PublicUserDataSchema>;
