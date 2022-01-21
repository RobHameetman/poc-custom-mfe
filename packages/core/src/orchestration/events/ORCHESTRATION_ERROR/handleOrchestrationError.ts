import { processOrchestrationQueue } from '../PROCESS_ORCHESTRATION_QUEUE';
import { OrchestrationErrorEvent } from './ORCHESTRATION_ERROR';

export const handleOrchestrationError = (
  e: OrchestrationErrorEvent,
  shouldProcessOrchestrationQueue: () => boolean,
  end: () => void,
): void => {
  end();

  if (shouldProcessOrchestrationQueue()) {
    processOrchestrationQueue();
  }
};
