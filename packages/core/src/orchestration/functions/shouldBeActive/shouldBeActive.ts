import { Service } from '../../../services';

export const shouldBeActive = (service: Service): boolean => {
  try {
    return service.activeWhen(window.location);
  } catch (err) {
    // TODO: Handle error

    return false;
  }
};
