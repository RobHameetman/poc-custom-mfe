import { RoutingEvents } from '../../enums';
import { Namespaces } from '../../../orchestration';
import { AsyncDetail, dispatch } from '../../../utils';

export const SET_ROUTER_LISTENING = `${Namespaces.Router}:${RoutingEvents.SET_ROUTER_LISTENING}`;
export type SET_ROUTER_LISTENING = typeof SET_ROUTER_LISTENING;

export interface SetRouterListeningEvent
  extends CustomEvent<AsyncDetail<SetRouterListeningEventDetail>> {
  readonly type: SET_ROUTER_LISTENING;
}

export interface SetRouterListeningEventDetail {
  readonly value: boolean;
}

export const setRouterListening = async (value: boolean): Promise<void> => {
  return dispatch<SetRouterListeningEventDetail>(SET_ROUTER_LISTENING, {
    value,
  });
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
