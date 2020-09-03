import { RegistrationEvents } from '../../enums';
import { AddServiceEvent } from '../../events';
import { Service } from '../../../services';
import { DispatchFn } from '../../../utils';

export const handleAddService = <T = Record<string, unknown>>(
  { detail: service }: AddServiceEvent<T>,
  addService: (service: Service<T>) => void,
  dispatch: DispatchFn
): void => {
  addService(service);
  dispatch(RegistrationEvents.REGISTRATION_SUCCESS, null);
};
