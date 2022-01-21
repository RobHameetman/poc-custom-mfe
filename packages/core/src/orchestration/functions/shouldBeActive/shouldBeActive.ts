import { AppFrameElement } from '../../../services';

export const shouldBeActive = (_: AppFrameElement): boolean => {
  try {
    // return service.activeWhen(window.location);
    return true;
  } catch (err) {
    // TODO: Handle error

    return false;
  }
};
