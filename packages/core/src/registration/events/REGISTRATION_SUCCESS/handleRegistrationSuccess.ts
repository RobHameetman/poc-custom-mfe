import { RegistrationSuccessEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleRegistrationSuccess = (
  e: RegistrationSuccessEvent,
): void => {
  logEvent(e);

  // TODO
};
