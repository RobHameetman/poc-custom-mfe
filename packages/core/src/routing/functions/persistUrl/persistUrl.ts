import { ParsedUrl } from '../parseUrl';
import { AppFrameElement } from '../../../services';

export const persistUrl = (routes: ParsedUrl): string => {
  let defaultRoute = routes[AppFrameElement.defaulSlotId];
  let url = '';

    if (defaultRoute) {
      url = defaultRoute;
    }

    Object.keys(routes).forEach((key) => {
      if (key !== AppFrameElement.defaulSlotId) {
        if (url) {
          url += `//${key}:${routes[key]}`;
        }
      }
    });

    return url;
};
