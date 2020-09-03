import { RegistrationEvents } from '../../enums';
import { Registry } from '../../types';
import { Service } from '../../../services';
import { dispatch } from '../../../utils';

export const ADD_SERVICE = `${Registry.namespace}:${RegistrationEvents.ADD_SERVICE}`;
export type ADD_SERVICE = typeof ADD_SERVICE;

export interface AddServiceEvent<T = Record<string, unknown>> extends CustomEvent<Service<T>> {
  type: ADD_SERVICE;
}

export const addService = <T = Record<string, unknown>>(service: Service<T>) => {
  dispatch(ADD_SERVICE, service);
};

export const isAddServiceEvent = <T = Record<string, unknown>>(value: unknown): value is AddServiceEvent<T> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<AddServiceEvent>).type === ADD_SERVICE
  );
};
