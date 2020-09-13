import { Namespaces, OrchestrationEvents } from '../../enums';
import { dispatch } from '../../../utils';

export const REROUTE_URL_ONLY = `${Namespaces.App}:${OrchestrationEvents.REROUTE_URL_ONLY}`;
export type REROUTE_URL_ONLY = typeof REROUTE_URL_ONLY;

export interface RerouteUrlOnlyEvent
  extends CustomEvent<RerouteUrlOnlyEventDetail> {
  type: REROUTE_URL_ONLY;
}

export type RerouteUrlOnlyEventDetail = null;

export const rerouteUrlOnly = () => {
  dispatch(REROUTE_URL_ONLY, null);
};

export const isRerouteUrlOnlyEvent = (
  value: unknown,
): value is RerouteUrlOnlyEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<RerouteUrlOnlyEvent>).type === REROUTE_URL_ONLY
  );
};
