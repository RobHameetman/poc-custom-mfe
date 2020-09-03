import { OrchestrationEvents } from '../../enums';
import { Orchestrator } from '../../types';
import { dispatch } from '../../../utils';

export const SET_ORCHESTRATOR_LISTENING = `${Orchestrator.namespace}:${OrchestrationEvents.SET_ORCHESTRATOR_LISTENING}`;
export type SET_ORCHESTRATOR_LISTENING = typeof SET_ORCHESTRATOR_LISTENING;

export interface SetOrchestratorListeningEvent
  extends CustomEvent<SetOrchestratorListeningEventDetail> {
  type: SET_ORCHESTRATOR_LISTENING;
}

export type SetOrchestratorListeningEventDetail = boolean;

export const setOrchestratorListening = (value: boolean) => {
  dispatch(SET_ORCHESTRATOR_LISTENING, value);
};

export const isSetOrchestratorListeningEvent = (
  value: unknown
): value is SetOrchestratorListeningEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<SetOrchestratorListeningEvent>).type === SET_ORCHESTRATOR_LISTENING
  );
};
