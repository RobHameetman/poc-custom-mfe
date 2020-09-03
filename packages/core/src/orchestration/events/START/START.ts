import { OrchestrationEvents } from '../../enums';
import { Orchestrator } from '../../types';
import { dispatch } from '../../../utils';

export const START = `${Orchestrator.namespace}:${OrchestrationEvents.START}`;
export type START = typeof START;

export interface StartEvent extends CustomEvent<StartEventDetail> {
  type: START;
}

export type StartEventDetail = null;

export const start = () => {
  dispatch(START, null);
};

export const isStartEvent = (value: unknown): value is StartEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<StartEvent>).type === START
  );
};