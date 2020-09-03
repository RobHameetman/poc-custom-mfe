import { RegistrationEvents } from '../../enums';
import { dispatchOnceFrom } from '../../../utils';
import { RegisterServiceInput, Registry } from '../../types';

export type RegisterEvent = CustomEvent<RegisterServiceInput>;

export const registerFrom = (service: string) => (
  serviceArgs: RegisterServiceInput,
) => {
  register(service, serviceArgs);
};

export const register = <T = Record<string, unknown>>(
  service: string,
  serviceArgs: RegisterServiceInput<T>,
) => {
  const dispatch = dispatchOnceFrom(service);

  dispatch(
    RegistrationEvents.REGISTER,
    Registry.tryToRegisterService,
    serviceArgs,
  );
};

export const isRegisterEvent = (value: unknown): value is RegisterEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<RegisterEvent>).type === 'string' &&
    (value as Partial<RegisterEvent>).type!.includes(
      RegistrationEvents.REGISTER,
    )
  );
};
