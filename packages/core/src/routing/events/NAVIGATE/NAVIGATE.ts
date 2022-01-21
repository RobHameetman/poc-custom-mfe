import { RoutingEvents } from '../../enums';
import { Route } from '../../types';
import { Namespaces } from '../../../orchestration';
import { AsyncDetail, dispatch } from '../../../utils';

export const NAVIGATE = `${Namespaces.Router}:${RoutingEvents.NAVIGATE}`;
export type NAVIGATE = typeof NAVIGATE;

export interface NavigateEvent
  extends CustomEvent<AsyncDetail<NavigateEventDetail>> {
  readonly type: NAVIGATE;
}

export interface NavigateEventDetail {
  readonly routes: ReadonlyArray<Route>;
  readonly subRoute?: string;
  readonly url: string;
}

export const navigate = async (
  routes: ReadonlyArray<Route>,
  url: string,
): Promise<void> => {
  return dispatch<NavigateEventDetail>(NAVIGATE, { routes, url });
};

export const isNavigateEvent = (value: unknown): value is NavigateEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<NavigateEvent>).type === NAVIGATE
  );
};
