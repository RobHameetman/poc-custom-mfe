import { Namespaces, OrchestrationEvents } from '../../enums';
import { AsyncDetail, dispatch } from '../../../utils';

export const PROCESS_ORCHESTRATION_QUEUE = `${Namespaces.App}:${OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE}`;
export type PROCESS_ORCHESTRATION_QUEUE = typeof PROCESS_ORCHESTRATION_QUEUE;

export interface ProcessOrchestrationQueueEvent
  extends CustomEvent<AsyncDetail<ProcessOrchestrationQueueEventDetail>> {
  readonly type: PROCESS_ORCHESTRATION_QUEUE;
}

export interface ProcessOrchestrationQueueEventDetail {}

export const processOrchestrationQueue = async (): Promise<void> => {
  return dispatch<ProcessOrchestrationQueueEventDetail>(
    PROCESS_ORCHESTRATION_QUEUE,
    {},
  );
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
