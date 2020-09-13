import { RoutingEventHandler } from '../RoutingEventHandler';
import { RoutingEvents } from '../../enums';
import { NavigateToUrlEventHandler, SetRouterListeningEventHandler } from '../RoutingEventHandler';

export interface RoutingEventHandlers {
  [RoutingEvents.NAVIGATE_TO_URL]: NavigateToUrlEventHandler;
  [RoutingEvents.SET_ROUTER_LISTENING]: SetRouterListeningEventHandler;
  [key: string]: RoutingEventHandler;
}
