import {
  OrchestrateEvent,
  ProcessOrchestrationQueueEvent,
  isOrchestrateEvent,
} from '../../events';
import { OrchestrateEventHandler } from '../../types';
import { orchestrationError } from '../ORCHESTRATION_ERROR';

export const handleProcessOrchestrationQueue = (
  e: ProcessOrchestrationQueueEvent,
  handleOrchestrate: OrchestrateEventHandler,
  shiftOrchestrationQueue: () => OrchestrateEvent | undefined,
) => {
  const OrchestrateEvent = shiftOrchestrationQueue();

  if (isOrchestrateEvent(OrchestrateEvent)) {
    handleOrchestrate(OrchestrateEvent);
  } else {
    orchestrationError(new Error('Invalid OrchestrateEvent'));
  }
};
