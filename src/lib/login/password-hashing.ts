import bcrypt from 'bcryptjs';

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
