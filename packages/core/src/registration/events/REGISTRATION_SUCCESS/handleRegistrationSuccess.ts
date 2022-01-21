import { RegistrationSuccessEvent } from '../../events';

export const handleRegistrationSuccess = (
  e: RegistrationSuccessEvent,
  onRegistrationSuccess?: () => void,
): void => {
  const { reject, resolve } = e.detail;

  try {
    if (onRegistrationSuccess) {
      onRegistrationSuccess();
    }
  
    resolve();
  } catch (error) {
    reject(error);
  }
};
