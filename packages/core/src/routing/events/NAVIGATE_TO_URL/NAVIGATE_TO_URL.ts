import { RoutingEvents } from '../../enums';
import { Router } from '../../types';
import { dispatch } from '../../../utils';

export const NAVIGATE_TO_URL = `${Router.namespace}:${RoutingEvents.NAVIGATE_TO_URL}`;
export type NAVIGATE_TO_URL = typeof NAVIGATE_TO_URL;

export interface NavigateToUrlEvent extends CustomEvent<string> {
  type: NAVIGATE_TO_URL;
}

export const navigateToUrl = (url: string) => {
  dispatch(NAVIGATE_TO_URL, url);
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
