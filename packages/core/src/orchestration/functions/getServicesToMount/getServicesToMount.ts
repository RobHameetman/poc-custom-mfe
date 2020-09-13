import { ServiceValidationFn } from '../../types';
import { Registry } from '../../../registration';
import { Service, ServiceStatuses } from '../../../services';

export const getServicesToMount = (
  validateService: ServiceValidationFn,
): Array<Service> => {
  return Registry.filter(
    (service) =>
      service.status === ServiceStatuses.LOADED &&
      validateService(service, ServiceStatuses.MOUNT_ERROR),
  );
};
