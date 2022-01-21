import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { AppRouterElement } from '../../../routing';
import { AppFrameElement } from '../../../services';
import { AsyncDetail, dispatchOnceFrom } from '../../../utils';

export type RegisterEvent = CustomEvent<AsyncDetail<RegisterEventDetail>>;

export type Registrar = Registry | AppRouterElement;

export interface RegisterEventDetail {
  readonly frame: AppFrameElement;
}

export const registerFrom = (frame: AppFrameElement) => async (): Promise<
  void
> => {
  return register(frame);
};

export const register = async (frame: AppFrameElement): Promise<void> => {
  const dispatch = dispatchOnceFrom(frame.name);

  return dispatch<RegisterEventDetail>(
    RegistrationEvents.REGISTER,
    Registry.handleRegister,
    { frame },
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
