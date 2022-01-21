import { Namespaces, OrchestrationEvents } from '../../enums';
import { Route } from '../../../routing';
import { AsyncDetail, dispatch } from '../../../utils';

export const ORCHESTRATE = `${Namespaces.App}:${OrchestrationEvents.ORCHESTRATE}`;
export type ORCHESTRATE = typeof ORCHESTRATE;

export interface OrchestrateEvent
  extends CustomEvent<AsyncDetail<OrchestrateEventDetail>> {
  readonly type: ORCHESTRATE;
}

export interface OrchestrateEventDetail {
  readonly route: Route;
}

export const orchestrate = async (route: Route): Promise<void> => {
  return dispatch(ORCHESTRATE, { route });
};

export const isOrchestrateEvent = (value: unknown): value is OrchestrateEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<OrchestrateEvent>).type === ORCHESTRATE
  );
};
