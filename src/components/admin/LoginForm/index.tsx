'use client';

import { loginAction } from '@/actions/login/login-action';
import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { HoneypotInput } from '@/components/HoneypotInput';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);
  const queryParam = useSearchParams();
  const router = useRouter();
  const userChanged = queryParam.get('userChanged');
  const created = queryParam.get('created');

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(err => toast.error(err));
    }
  }, [state]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.info('Conta criada com sucesso. Faça login');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }

    if (userChanged === '1') {
      toast.dismiss();
      toast.info('Seus dados foram alterados. Faça login novamente');
      const url = new URL(window.location.href);
      url.searchParams.delete('userChanged');
      router.replace(url.toString());
    }
  }, [router, created, userChanged]);

  return (
    <form action={action} className='flex-1 flex flex-col gap-6'>
      <DefaultInput
        type='email'
        name='email'
        labelText='E-mail'
        placeholder='Insira seu e-mail'
        disabled={isPending}
        defaultValue={state.email}
        required
      />

      <DefaultInput
        type='password'
        name='password'
        labelText='Senha'
        placeholder='Insira sua senha'
        disabled={isPending}
        required
      />

      <HoneypotInput />

      <DefaultButton
        className='mt-6'
        type='submit'
        variant='default'
        disabled={isPending}
      >
        <LogInIcon />
        Entrar
      </DefaultButton>

      <p className='text-sm/tight text-center '>
        <span>Não possui uma conta? </span>
        <Link
          className='hover:underline transition text-blue-600'
          href={'/user/new'}
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
