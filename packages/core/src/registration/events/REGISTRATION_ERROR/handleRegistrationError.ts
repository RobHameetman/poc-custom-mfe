import { RegistrationErrorEvent } from '../../events';

export const handleRegistrationError = (e: RegistrationErrorEvent): void => {
  const { resolve } = e.detail;

  resolve();
};
