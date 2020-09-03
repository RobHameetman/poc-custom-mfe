import { dispatchFrom } from './../../../utils';
import { Service, ServiceHookEvents } from '../../../services';

export const unload = (service: Service) => {
  const dispatch = dispatchFrom(service.name);

  dispatch(ServiceHookEvents.UNLOAD, null);
};
