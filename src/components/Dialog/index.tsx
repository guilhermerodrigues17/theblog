'use client';

import clsx from 'clsx';
import React from 'react';
import { DefaultButton } from '../DefaultButton';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }

  return (
    <div
      className={clsx(
        'fixed z-50 inset-0 bg-black/40 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 p-6 rounded-lg',
          'max-w-2xl mx-8',
          'flex flex-col gap-6',
          'shadow-lg shadow-black/30 text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='font-bold text-xl'>
          {title}
        </h3>

        <div id='dialog-description'>{content}</div>

        <div className={clsx('flex items-center justify-around')}>
          <DefaultButton
            variant='ghost'
            size='md'
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </DefaultButton>

          <DefaultButton
            variant='default'
            size='md'
            onClick={onConfirm}
            disabled={disabled}
          >
            OK
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
