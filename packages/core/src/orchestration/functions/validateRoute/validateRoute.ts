import { Service, ServiceStatuses } from '../../../services';

export const validateRoute = (service: Service, _: ServiceStatuses): boolean => {
  try {
    return service.activeWhen(window.location);
  } catch (err) {
    // handleAppError(err, service, status);

    return false;
  }
};
