import { ZodError } from 'zod';

export function getZodMessageError(error: ZodError): string[] {
  return error.issues.map(issue => issue.message);
}
