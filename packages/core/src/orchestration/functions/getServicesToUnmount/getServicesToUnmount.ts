import { ServiceValidationFn } from '../../types';
import { Registry } from '../../../registration';
import { Service, ServiceStatuses } from '../../../services';

export const getServicesToUnmount = (validateService: ServiceValidationFn): Array<Service> => {
  return Registry.filter(
    (service) =>
      service.status === ServiceStatuses.MOUNT_ERROR ||
      (service.status === ServiceStatuses.MOUNTED &&
        !validateService(service, ServiceStatuses.UNMOUNT_ERROR))
  );
};
