import { NavigateToUrlEvent, SetRouterListeningEvent } from '../../events';

export type NavigateToUrlEventHandler = (e: NavigateToUrlEvent) => void;
export type SetRouterListeningEventHandler = (
  e: SetRouterListeningEvent,
) => void;

export type RoutingEventHandler =
  | NavigateToUrlEventHandler
  | SetRouterListeningEventHandler;
