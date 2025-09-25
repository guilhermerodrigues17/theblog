import { asyncDelay } from './async-delay';

export async function verifyIsBot(formData: FormData, throttleDelay = 2000) {
  await asyncDelay(throttleDelay);

  const hpInputValue = formData.get('inputHp');

  const isBot =
    hpInputValue === null ||
    (typeof hpInputValue === 'string' && hpInputValue.trim() !== '');

  return isBot;
}
