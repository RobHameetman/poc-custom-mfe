import { dispatchFrom } from './../../../utils';
import { Service, ServiceHookEvents } from '../../../services';

export const mount = (service: Service) => {
  const dispatch = dispatchFrom(service.name);

  dispatch(ServiceHookEvents.MOUNT, null);
};
