import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckbox({
  labelText = '',
  type = 'checkbox',
  ...props
}: InputCheckboxProps) {
  const id = useId();
  return (
    <div className='flex items-center gap-3'>
      <input
        {...props}
        className={clsx(
          'w-4 h-4',
          'outline-none',
          'focus:ring-2 focus:ring-blue-600',
          props.className,
        )}
        id={id}
        type={type}
      />
      {labelText && (
        <label htmlFor={id} className='text-sm'>
          {labelText}
        </label>
      )}
    </div>
  );
}
