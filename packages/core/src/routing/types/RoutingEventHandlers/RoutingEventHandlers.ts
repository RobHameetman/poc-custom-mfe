import {
  ActivateRouteEventHandler,
  NavigateEventHandler,
  SetRouterListeningEventHandler,
} from '../RoutingEventHandler';
import { RoutingEvents } from '../../enums';

export interface RoutingEventHandlers {
  readonly [RoutingEvents.ACTIVATE_ROUTE]: ActivateRouteEventHandler;
  readonly [RoutingEvents.NAVIGATE]: NavigateEventHandler;
  readonly [RoutingEvents.SET_ROUTER_LISTENING]: SetRouterListeningEventHandler;
}
