import { RoutingEvents } from '../../enums';
import { Router } from '../../types';
import { dispatch } from '../../../utils';

export const SET_ROUTER_LISTENING = `${Router.namespace}:${RoutingEvents.SET_ROUTER_LISTENING}`;
export type SET_ROUTER_LISTENING = typeof SET_ROUTER_LISTENING;

export interface SetRouterListeningEvent extends CustomEvent<boolean> {
  type: SET_ROUTER_LISTENING;
}

export const setRouterListening = (value: boolean) => {
  dispatch(SET_ROUTER_LISTENING, value);
};

export const isSetRouterListeningEvent = (
  value: unknown,
): value is SetRouterListeningEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<SetRouterListeningEvent>).type === SET_ROUTER_LISTENING
  );
};
