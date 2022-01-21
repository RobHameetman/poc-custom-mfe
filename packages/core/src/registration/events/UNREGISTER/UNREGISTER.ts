import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { AppFrameElement } from '../../../services';
import { AsyncDetail, dispatch } from '../../../utils';

export const UNREGISTER = `${Registry.namespace}:${RegistrationEvents.UNREGISTER}`;
export type UNREGISTER = typeof UNREGISTER;

export interface UnregisterEvent
  extends CustomEvent<AsyncDetail<UnregisterEventDetail>> {
  readonly type: UNREGISTER;
}

export interface UnregisterEventDetail {
  readonly frame: AppFrameElement;
}

export const Unregister = async (frame: AppFrameElement): Promise<void> => {
  return dispatch<UnregisterEventDetail>(UNREGISTER, { frame });
};

export const isUnregisterEvent = (
  value: unknown,
): value is UnregisterEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<UnregisterEvent>).type === UNREGISTER
  );
};
