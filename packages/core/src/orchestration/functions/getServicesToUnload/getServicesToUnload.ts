import { Registry } from '../../../registration';
import { AppFrameElement, ServiceStatuses } from '../../../services';

export const getServicesToUnload = (): Array<AppFrameElement> => {
  return Registry.filter(
    (service) => service.status === ServiceStatuses.LOAD_ERROR,
  );
};
