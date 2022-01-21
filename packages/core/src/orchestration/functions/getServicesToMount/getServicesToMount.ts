import { ServiceValidationFn } from '../../types';
import { Registry } from '../../../registration';
import { AppFrameElement, ServiceStatuses } from '../../../services';

export const getServicesToMount = (
  validateService: ServiceValidationFn,
): Array<AppFrameElement> => {
  return Registry.filter(
    (service) =>
      service.status === ServiceStatuses.LOADED &&
      validateService(service, ServiceStatuses.MOUNT_ERROR),
  );
};
