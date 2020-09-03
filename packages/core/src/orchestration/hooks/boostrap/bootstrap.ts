import { dispatchFrom } from './../../../utils';
import { Service, ServiceHookEvents } from '../../../services';

export const bootstrap = (service: Service) => {
  const dispatch = dispatchFrom(service.name);

  dispatch(ServiceHookEvents.BOOT, null);
};
