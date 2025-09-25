'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { redirect } from 'next/navigation';

export async function logoutAction(redirectPath = '/') {
  await deleteLoginSession();
  redirect(redirectPath);
}
