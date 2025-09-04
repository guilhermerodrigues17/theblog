import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpString = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

export async function generateHash(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64Hash = Buffer.from(hash).toString('base64');
  return base64Hash;
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

export async function createLoginSession(username: string) {
  const expiresIn = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = username + 'session_placeholder';
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresIn,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}
