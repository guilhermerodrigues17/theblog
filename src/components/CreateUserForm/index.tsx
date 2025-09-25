'use client';
import { User2Icon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import Link from 'next/link';
import clsx from 'clsx';
import { useActionState, useEffect } from 'react';
import { createUserAction } from '@/actions/user/create-user-action';
import { PublicUserDataSchema } from '@/lib/user/schemas';
import { toast } from 'react-toastify';
import { HoneypotInput } from '../HoneypotInput';

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserDataSchema.parse({}),
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'max-w-sm mx-auto mt-16',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <DefaultInput
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Insira seu nome'
          defaultValue={state.user.name}
          disabled={isPending}
          required
        />

        <DefaultInput
          type='text'
          name='email'
          labelText='E-mail'
          placeholder='Insira seu e-mail'
          defaultValue={state.user.email}
          disabled={isPending}
          required
        />

        <DefaultInput
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Insira sua senha'
          defaultValue={''}
          disabled={isPending}
          required
        />

        <DefaultInput
          type='password'
          name='password2'
          labelText='Repetir senha'
          placeholder='Insira novamente sua senha'
          disabled={isPending}
          required
        />

        <HoneypotInput />

        <DefaultButton className='mt-6' type='submit' disabled={isPending}>
          <User2Icon />
          Criar conta
        </DefaultButton>

        <p className='text-sm/tight text-center '>
          <span>Já possui uma conta? </span>
          <Link
            className='hover:underline transition text-blue-600'
            href={'/login'}
          >
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
