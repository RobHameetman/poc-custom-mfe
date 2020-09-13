import { RoutingEvents } from '../../enums';
import { Namespaces } from '../../../orchestration';
import { dispatch } from '../../../utils';

export const NAVIGATE_TO_URL = `${Namespaces.Router}:${RoutingEvents.NAVIGATE_TO_URL}`;
export type NAVIGATE_TO_URL = typeof NAVIGATE_TO_URL;

export interface NavigateToUrlEvent
  extends CustomEvent<NavigateToUrlEventDetail> {
  readonly type: NAVIGATE_TO_URL;
}

export interface NavigateToUrlEventDetail {
  readonly url: string;
}

export const navigateToUrl = (url: string) => {
  dispatch(NAVIGATE_TO_URL, { url });
};

export const isNavigateToUrlEvent = (
  value: unknown,
): value is NavigateToUrlEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<NavigateToUrlEvent>).type === NAVIGATE_TO_URL
  );
};
