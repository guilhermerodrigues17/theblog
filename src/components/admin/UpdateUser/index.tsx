import { getPublicUser } from '@/lib/user/queries/get-public-user';
import { UpdateUserForm } from './form';
import { ErrorMessage } from '@/components/ErrorMessage';

export async function UpdateUser() {
  const user = await getPublicUser();

  if (!user) {
    return (
      <ErrorMessage
        contentTitle='Ops...'
        content='Você precisa fazer login novamente'
      />
    );
  }

  return <UpdateUserForm user={user} />;
}
