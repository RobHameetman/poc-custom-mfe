import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { Service } from '../../../services';
import { dispatch } from '../../../utils';

export const REMOVE_SERVICE = `${Registry.namespace}:${RegistrationEvents.REMOVE_SERVICE}`;
export type REMOVE_SERVICE = typeof REMOVE_SERVICE;

export interface RemoveServiceEvent<T = Record<string, unknown>>
  extends CustomEvent<Service<T>> {
  type: REMOVE_SERVICE;
}

export const removeService = <T = Record<string, unknown>>(
  service: Service<T>,
) => {
  dispatch(REMOVE_SERVICE, service);
};

export const isRemoveServiceEvent = (
  value: unknown,
): value is RemoveServiceEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<RemoveServiceEvent>).type === REMOVE_SERVICE
  );
};
