import { NavigateEvent } from './NAVIGATE';
import { activateRoute } from '../ACTIVATE_ROUTE';
import { AppRouterElement } from '../../components';
import { orchestrate, orchestrationError } from '../../../orchestration';

export const handleNavigate = async (e: NavigateEvent): Promise<void> => {
  const {
    detail: { resolve, routes, subRoute, url },
  } = e;

  try {
    let route = routes.find((route) => route.path === url);

    if (!route) {
      throw Error(`route not found: ${url}`);
    }

    if (subRoute) {
    route.frames.forEach((frame) => {
      if (frame.$ref) {
        frame.$ref.contentWindow?.postMessage(
          { message: 'sub-route', route: subRoute },
          AppRouterElement.config.allowedOrigins,
        );
      }
    });
  }

    activateRoute(route, subRoute);

    // route.frames.forEach((frame) => {
    //   frame.mount(route as Route, subRoute);
    // });

    await orchestrate(route)
  } catch (error) {
    orchestrationError(error);
  } finally {
    resolve();
  }
};
