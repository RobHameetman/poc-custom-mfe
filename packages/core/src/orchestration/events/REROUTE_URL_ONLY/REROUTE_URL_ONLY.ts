import { Namespaces, OrchestrationEvents } from '../../enums';
import { AsyncDetail, dispatch } from '../../../utils';

export const REROUTE_URL_ONLY = `${Namespaces.App}:${OrchestrationEvents.REROUTE_URL_ONLY}`;
export type REROUTE_URL_ONLY = typeof REROUTE_URL_ONLY;

export interface RerouteUrlOnlyEvent
  extends CustomEvent<AsyncDetail<RerouteUrlOnlyEventDetail>> {
  readonly type: REROUTE_URL_ONLY;
}

export interface RerouteUrlOnlyEventDetail {}

export const rerouteUrlOnly = async (): Promise<void> => {
  return dispatch<RerouteUrlOnlyEventDetail>(REROUTE_URL_ONLY, {});
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
