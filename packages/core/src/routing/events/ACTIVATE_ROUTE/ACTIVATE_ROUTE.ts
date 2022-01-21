import { RoutingEvents } from '../../enums';
import { Route } from '../../types';
import { Namespaces } from '../../../orchestration';
import { AsyncDetail, dispatch } from '../../../utils';

export const ACTIVATE_ROUTE = `${Namespaces.Router}:${RoutingEvents.ACTIVATE_ROUTE}`;
export type ACTIVATE_ROUTE = typeof ACTIVATE_ROUTE;

export interface ActivateRouteEvent
  extends CustomEvent<AsyncDetail<ActivateRouteEventDetail>> {
  readonly type: ACTIVATE_ROUTE;
}

export interface ActivateRouteEventDetail {
  readonly route: Route;
  readonly subRoute?: string;
}

export const activateRoute = async (
  route: Route,
  subRoute?: string,
): Promise<void> => {
  return dispatch<ActivateRouteEventDetail>(ACTIVATE_ROUTE, {
    route,
    subRoute,
  });
};

export const isActivateRouteEvent = (
  value: unknown,
): value is ActivateRouteEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<ActivateRouteEvent>).type === ACTIVATE_ROUTE
  );
};
