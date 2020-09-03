import { RegistrationEvents } from '../../enums';
import { dispatchFrom } from '../../../utils';

export type RegistrationErrorEvent = CustomEvent<null>;

export const registrationError = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(RegistrationEvents.REGISTRATION_ERROR, null);
};

export const registrationErrorFrom = (service: string) => () => {
  registrationError(service);
};

export const isRegistrationErrorEvent = (
  value: unknown,
): value is RegistrationErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<RegistrationErrorEvent>).type === 'string' &&
    (value as Partial<RegistrationErrorEvent>).type!.includes(
      RegistrationEvents.REGISTRATION_ERROR,
    )
  );
};
