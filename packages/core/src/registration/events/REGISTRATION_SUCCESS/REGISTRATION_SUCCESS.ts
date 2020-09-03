import { RegistrationEvents } from '../../enums';
import { dispatchFrom } from '../../../utils';

export type RegistrationSuccessEvent = CustomEvent<null>;

export const registrationSuccess = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(RegistrationEvents.REGISTRATION_SUCCESS, null);
};

export const registrationSuccessFrom = (service: string) => () => {
  registrationSuccess(service);
};

export const isRegistrationSuccessEvent = (
  value: unknown,
): value is RegistrationSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<RegistrationSuccessEvent>).type === 'string' &&
    (value as Partial<RegistrationSuccessEvent>).type!.includes(
      RegistrationEvents.REGISTRATION_SUCCESS,
    )
  );
};
