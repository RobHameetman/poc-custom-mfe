import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { AsyncDetail, dispatch } from '../../../utils';

export const SET_REGISTRY_LISTENING = `${Registry.namespace}:${RegistrationEvents.SET_REGISTRY_LISTENING}`;
export type SET_REGISTRY_LISTENING = typeof SET_REGISTRY_LISTENING;

export interface SetRegistryListeningEvent
  extends CustomEvent<AsyncDetail<SetRegistryListeningEventDetail>> {
  readonly type: SET_REGISTRY_LISTENING;
}

export interface SetRegistryListeningEventDetail {
  readonly value: boolean;
}

export const setRegistryListening = async (value: boolean): Promise<void> => {
  return dispatch<SetRegistryListeningEventDetail>(SET_REGISTRY_LISTENING, {
    value,
  });
};

export const isSetRegistryListeningEvent = (
  value: unknown,
): value is SetRegistryListeningEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<SetRegistryListeningEvent>).type ===
      SET_REGISTRY_LISTENING
  );
};
