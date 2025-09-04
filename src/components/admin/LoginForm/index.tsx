'use client';

import { loginAction } from '@/actions/login/login-action';
import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { LogInIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={action} className='flex-1 flex flex-col gap-6'>
      <DefaultInput
        type='text'
        name='username'
        labelText='Usuário'
        placeholder='Insira seu nome de usuário'
        disabled={isPending}
        defaultValue={state.username}
      />

      <DefaultInput
        type='password'
        name='password'
        labelText='Senha'
        placeholder='Insira sua senha'
        disabled={isPending}
      />

      <DefaultButton type='submit' variant='default' disabled={isPending}>
        <LogInIcon />
        Entrar
      </DefaultButton>
    </form>
  );
}
