import { ActivateRouteEvent } from './ACTIVATE_ROUTE';
import { parseUrl, persistUrl } from '../../functions';
import { Route } from '../../types';
import { AppFrameElement } from '../../../services';

export const handleActivateRoute = (
  e: ActivateRouteEvent,
  onRouteActivated: (route: Route) => void,
): void => {
  const {
    detail: { reject, resolve, route, subRoute },
  } = e;

  try {
    const { path, slotId } = route;

    let currentRoutes = parseUrl(`${location.hash.slice(1)}\0`);
    let _subRoute;
    let hash = '';

    if (subRoute) {
      _subRoute =
        subRoute && subRoute.startsWith('/') ? subRoute?.slice(1) : subRoute;
    }

    hash = _subRoute ? `${path}/${_subRoute}` : path;

    currentRoutes[slotId || AppFrameElement.defaulSlotId] = hash;

    console.log('handleActivateRoute::currentRoutes:', currentRoutes);

    if (subRoute && path !== window.location.pathname) {
      history.replaceState(
        null,
        '',
        `${document.location.pathname}#${persistUrl(currentRoutes)}`,
      );
    }

    // Router.instance.setActiveRoute(hash);

    onRouteActivated(route);
    resolve();
  } catch (error) {
    reject(error);
  }
};
