import { DefaultButton } from '@/components/DefaultButton';
import { DefaultInput } from '@/components/DefaultInput';
import { InputCheckbox } from '@/components/InputCheckbox';

export function ManagePostForm() {
  return (
    <form action=''>
      <div className='flex flex-col gap-6'>
        <DefaultInput labelText='Nome' placeholder='Digite...' />
        <DefaultInput labelText='Sobrenome' placeholder='Digite...' />

        <InputCheckbox labelText='Selecionar' />

        <div className='mt-6'>
          <DefaultButton type='submit'>Enviar</DefaultButton>
        </div>
      </div>
    </form>
  );
}
