import { Namespaces, OrchestrationEvents } from '../../enums';
import { dispatch } from '../../../utils';

export const PROCESS_ORCHESTRATION_QUEUE = `${Namespaces.App}:${OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE}`;
export type PROCESS_ORCHESTRATION_QUEUE = typeof PROCESS_ORCHESTRATION_QUEUE;

export interface ProcessOrchestrationQueueEvent
  extends CustomEvent<ProcessOrchestrationQueueEventDetail> {
  type: PROCESS_ORCHESTRATION_QUEUE;
}

export type ProcessOrchestrationQueueEventDetail = null;

export const processOrchestrationQueue = (): void => {
  dispatch(PROCESS_ORCHESTRATION_QUEUE, null);
};

export const isProcessOrchestrationQueueEvent = (
  value: unknown,
): value is ProcessOrchestrationQueueEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<ProcessOrchestrationQueueEvent>).type ===
      PROCESS_ORCHESTRATION_QUEUE
  );
};
