import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpString = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

const jwtSecret = process.env.JWT_SECRET_KEY;
const jwtSecretEncoded = new TextEncoder().encode(jwtSecret);

type JwtPayload = {
  username: string;
  expiresIn: Date;
};

export async function createLoginSession(username: string) {
  const expiresIn = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJwt({ username, expiresIn });
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

export async function verifyLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;
  if (!jwt) return false;

  return verifyJwt(jwt);
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setIssuedAt()
    .setExpirationTime(loginExpString)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .sign(jwtSecretEncoded);
}

export async function verifyJwt(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtSecretEncoded, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return false;
  }
}

// manage-login methods to api backend

export async function createLoginSessionFromApi(acessToken: string) {
  const expiresIn = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = acessToken;
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresIn,
  });
}

export async function verifyLoginSessionFromApi() {
  const cookieStore = await cookies();

  const acessToken = cookieStore.get(loginCookieName)?.value;
  if (!acessToken) return false;

  return acessToken;
}

export async function requireLoginSession() {
  const isAuthenticated = await verifyLoginSessionFromApi();

  if (!isAuthenticated) {
    redirect('/login');
  }
}
