import { RegistrationErrorEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleRegistrationError = (e: RegistrationErrorEvent): void => {
  logEvent(e);

  // TODO
};
