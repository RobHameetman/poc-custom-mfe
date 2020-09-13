import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { dispatch } from '../../../utils';

export const SET_REGISTRY_LISTENING = `${Registry.namespace}:${RegistrationEvents.SET_REGISTRY_LISTENING}`;
export type SET_REGISTRY_LISTENING = typeof SET_REGISTRY_LISTENING;

export interface SetRegistryListeningEvent
  extends CustomEvent<SetRegistryListeningEventDetail> {
  type: SET_REGISTRY_LISTENING;
}

export interface SetRegistryListeningEventDetail {
  value: boolean;
}

export const setRegistryListening = (value: boolean) => {
  dispatch(SET_REGISTRY_LISTENING, { value });
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
