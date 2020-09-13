import { Registry } from '../../../registration';
import { Service, ServiceStatuses } from '../../../services';

export const getServicesToUnload = (): Array<Service> => {
  return Registry.filter(
    (service) => service.status === ServiceStatuses.LOAD_ERROR,
  );
};
