import { dispatchFrom } from './../../../utils';
import { Service, ServiceHookEvents } from '../../../services';

export const load = (service: Service) => {
  const dispatch = dispatchFrom(service.name);

  dispatch(ServiceHookEvents.LOAD, null);
};
