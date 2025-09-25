'use client';

import { changePasswordAction } from '@/actions/user/change-password-action';
import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import clsx from 'clsx';
import { SaveIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function ChangePasswordForm() {
  const [state, action, isPending] = useActionState(changePasswordAction, {
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();

    if (state.errors.length > 0) {
      state.errors.forEach(err => toast.error(err));
    }
  }, [state]);

  return (
    <div className={clsx('flex flex-col', 'max-w-sm mt-12 mx-auto')}>
      <form action={action} className='flex flex-1 flex-col gap-6'>
        <DefaultInput
          type='password'
          name='currentPassword'
          labelText='Senha atual'
          placeholder='Insira sua senha atual'
          disabled={isPending}
          defaultValue={''}
          required
        />

        <DefaultInput
          type='password'
          name='newPassword'
          labelText='Nova senha'
          placeholder='Insira sua nova senha'
          defaultValue={''}
          disabled={isPending}
          required
        />

        <DefaultInput
          type='password'
          name='newPassword2'
          labelText='Repetir nova senha'
          placeholder='Insira sua nova senha novamente'
          defaultValue={''}
          disabled={isPending}
          required
        />

        <DefaultButton
          type='submit'
          size='md'
          disabled={isPending}
          className='mt-3'
        >
          <SaveIcon />
          Salvar alterações
        </DefaultButton>
      </form>
    </div>
  );
}
