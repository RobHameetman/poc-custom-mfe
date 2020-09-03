import { ServiceValidationFn } from '../../types';
import { Registry } from '../../../registration';
import { Service, ServiceStatuses } from '../../../services';

export const getServicesToLoad = (validateService: ServiceValidationFn): Array<Service> => {
  return Registry.filter(
    (service) =>
      (service.status === ServiceStatuses.REGISTERED &&
        validateService(service, ServiceStatuses.LOAD_ERROR)) ||
      (service.status === ServiceStatuses.LOAD_ERROR &&
        new Date().getTime() - service.loadErrorTime >= 200)
  );
};
