import { NavigateEvent, ActivateRouteEvent, SetRouterListeningEvent } from '../../events';

export type ActivateRouteEventHandler = (e: ActivateRouteEvent) => void;
export type NavigateEventHandler = (e: NavigateEvent) => void;
export type SetRouterListeningEventHandler = (
  e: SetRouterListeningEvent,
) => void;

export type RoutingEventHandler =
  | ActivateRouteEventHandler
  | NavigateEventHandler
  | SetRouterListeningEventHandler;
