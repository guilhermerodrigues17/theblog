import { User2Icon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import Link from 'next/link';
import clsx from 'clsx';

export function CreateUserForm() {
  return (
    <div
      className={clsx(
        'flex items-center justify-center text-center',
        'max-w-sm mx-auto mt-16',
      )}
    >
      <form action={''} className='flex-1 flex flex-col gap-6'>
        <DefaultInput
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Insira seu nome'
          defaultValue={''}
          disabled={false}
          required
        />

        <DefaultInput
          type='text'
          name='email'
          labelText='E-mail'
          placeholder='Insira seu e-mail'
          defaultValue={''}
          disabled={false}
          required
        />

        <DefaultInput
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Insira sua senha'
          defaultValue={''}
          disabled={false}
          required
        />

        <DefaultInput
          type='password'
          name='password2'
          labelText='Repetir senha'
          placeholder='Insira novamente sua senha'
          disabled={false}
          required
        />

        <DefaultButton className='my-6' type='submit' disabled={false}>
          <User2Icon />
          Criar conta
        </DefaultButton>

        <p className='text-sm/tight'>
          <Link href={'/login'}>Já possui uma conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
