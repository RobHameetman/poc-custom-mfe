import { AppFrameElement, ServiceStatuses } from '../../../services';

export const validateRoute = (
  service: AppFrameElement,
  _: ServiceStatuses,
): boolean => {
  try {
    // return service.activeWhen(window.location);
    return true;
  } catch (err) {
    // handleAppError(err, service, status);

    return false;
  }
};
