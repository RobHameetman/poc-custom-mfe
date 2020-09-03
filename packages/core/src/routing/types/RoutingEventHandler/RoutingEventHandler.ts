import { NavigateToUrlEvent } from '../../events';

export type NavigateToUrlEventHandler = (e: NavigateToUrlEvent) => void;

export type RoutingEventHandler = NavigateToUrlEventHandler;
