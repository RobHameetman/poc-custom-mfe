import { Namespaces, OrchestrationEvents } from '../../enums';
import { AsyncDetail, dispatch } from '../../../utils';

export const SET_ORCHESTRATOR_LISTENING = `${Namespaces.App}:${OrchestrationEvents.SET_ORCHESTRATOR_LISTENING}`;
export type SET_ORCHESTRATOR_LISTENING = typeof SET_ORCHESTRATOR_LISTENING;

export interface SetOrchestratorListeningEvent
  extends CustomEvent<AsyncDetail<SetOrchestratorListeningEventDetail>> {
  readonly type: SET_ORCHESTRATOR_LISTENING;
}

export interface SetOrchestratorListeningEventDetail {
  readonly value: boolean;
}

export const setOrchestratorListening = async (
  value: boolean,
): Promise<void> => {
  return dispatch(SET_ORCHESTRATOR_LISTENING, { value });
};

export const isSetOrchestratorListeningEvent = (
  value: unknown,
): value is SetOrchestratorListeningEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<SetOrchestratorListeningEvent>).type ===
      SET_ORCHESTRATOR_LISTENING
  );
};
