'use client';

import clsx from 'clsx';
import React from 'react';

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
          <button
            className={clsx(
              'py-2 px-4 bg-slate-200 text-slate-950 rounded-lg',
              'transition hover:bg-slate-300 cursor-pointer',
              'flex items-center justify-center',
              'sm:min-w-[200px]',
              'disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed',
            )}
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </button>

          <button
            className={clsx(
              'py-2 px-4 bg-blue-400 text-slate-950 rounded-lg',
              'transition hover:bg-blue-500 cursor-pointer',
              'flex items-center justify-center',
              'sm:min-w-[200px]',
              'disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed',
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
