'use client';

import { deleteUserAction } from '@/actions/user/delete-user-action';
import { updateUserAction } from '@/actions/user/update-user-action';
import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { Dialog } from '@/components/Dialog';
import { Divisor } from '@/components/Divisor';
import { PublicUserDataDto } from '@/lib/user/schemas';
import { asyncDelay } from '@/utils/async-delay';
import clsx from 'clsx';
import { LockKeyholeIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import React, {
  useActionState,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { toast } from 'react-toastify';

type UpdateUserFormProps = {
  user: PublicUserDataDto;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [state, action, isPending] = useActionState(updateUserAction, {
    user,
    errors: [],
    success: false,
  });

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogTransition, startTransition] = useTransition();
  const safetyDelay = 5000;
  const isElementDisabled = dialogTransition || isPending;

  function showDeleteUserAccountDialog(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();

    setIsDialogVisible(true);

    startTransition(async () => {
      await asyncDelay(safetyDelay);
    });
  }

  function handleDeleteUserAccount() {
    startTransition(async () => {
      const result = await deleteUserAction();

      if (result.errors) {
        toast.dismiss();
        result.errors.forEach(err => toast.error(err));
      }

      setIsDialogVisible(false);
    });
  }

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(err => toast.error(err));
    }

    if (state.success) {
      toast.info('Dados alterados com sucesso');
    }
  }, [state]);

  return (
    <div className={clsx('flex flex-col', 'max-w-md mt-12 mx-auto')}>
      <form action={action} className='flex flex-1 flex-col gap-6'>
        <DefaultInput
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Nome'
          disabled={isElementDisabled}
          defaultValue={state.user.name}
        />

        <DefaultInput
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Insira seu e-mail'
          disabled={isElementDisabled}
          defaultValue={state.user.email}
        />

        <div>
          <DefaultButton type='submit' size='md'>
            Salvar
          </DefaultButton>
        </div>
      </form>

      <Divisor />

      <div className={clsx('flex flex-col gap-6')}>
        <Link
          href='/admin/user/password'
          className={clsx(
            'flex items-center gap-2 [&_svg]:w-5 [&_svg]:h-5',
            'hover:text-slate-600',
          )}
        >
          <LockKeyholeIcon />
          Alterar senha
        </Link>

        <Link
          href='#'
          className={clsx(
            'flex items-center gap-2 [&_svg]:w-5 [&_svg]:h-5',
            'text-red-500 hover:text-red-400',
          )}
          onClick={showDeleteUserAccountDialog}
        >
          <Trash2Icon />
          Deletar conta
        </Link>
      </div>

      <Dialog
        title='Deletar conta?'
        content={
          <p>
            Ao deletar sua conta todos os seus dados, incluindo seus posts,
            serão apagados. Essa é uma ação <b>IRREVERSÍVEL</b>! Clique em{' '}
            <b>OK</b> para confirmar ou <b>Cancelar</b> para fechar essa janela.
          </p>
        }
        onCancel={() => setIsDialogVisible(false)}
        onConfirm={handleDeleteUserAccount}
        isVisible={isDialogVisible}
        disabled={isElementDisabled}
      />
    </div>
  );
}
