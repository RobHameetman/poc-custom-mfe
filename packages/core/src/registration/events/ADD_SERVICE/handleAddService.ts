import { RegistrationEvents } from '../../enums';
import { AddServiceEvent } from '../../events';
import { Service } from '../../../services';
import { DispatchFn, logEvent } from '../../../utils';

export const handleAddService = <T = Record<string, unknown>>(
  e: AddServiceEvent<T>,
  addService: (service: Service<T>) => void,
  dispatch: DispatchFn,
): void => {
  logEvent(e);

  const { detail: service } = e;

  addService(service);
  dispatch(RegistrationEvents.REGISTRATION_SUCCESS, null);
};
