import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { AppFrameElement } from '../../../services';
import { AsyncDetail, dispatch } from '../../../utils';

export const REGISTRATION_ERROR = `${Registry.namespace}:${RegistrationEvents.REGISTRATION_ERROR}`;
export type REGISTRATION_ERROR = typeof REGISTRATION_ERROR;

export type RegistrationErrorEvent = CustomEvent<
  AsyncDetail<RegistrationErrorEventDetail>
>;

export interface RegistrationErrorEventDetail {
  readonly error: Error;
  readonly frame: AppFrameElement;
}

export const registrationError = async (
  frame: AppFrameElement,
  error: Error,
): Promise<void> => {
  return dispatch<RegistrationErrorEventDetail>(REGISTRATION_ERROR, {
    error,
    frame,
  });
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
