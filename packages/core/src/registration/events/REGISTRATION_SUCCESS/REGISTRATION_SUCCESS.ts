import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { AppFrameElement } from '../../../services';
import { AsyncDetail, dispatch } from '../../../utils';

export const REGISTRATION_SUCCESS = `${Registry.namespace}:${RegistrationEvents.REGISTRATION_SUCCESS}`;
export type REGISTRATION_SUCCESS = typeof REGISTRATION_SUCCESS;

export type RegistrationSuccessEvent = CustomEvent<
  AsyncDetail<RegistrationSuccessEventDetail>
>;

export interface RegistrationSuccessEventDetail {
  readonly frame: AppFrameElement;
}

export const registrationSuccess = async (
  frame: AppFrameElement,
): Promise<void> => {
  return dispatch<RegistrationSuccessEventDetail>(REGISTRATION_SUCCESS, {
    frame,
  });
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
