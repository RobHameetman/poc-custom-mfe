import { OrchestrationEvents } from '../../enums';
import { CallHooksEvent, ProcessOrchestrationQueueEvent, isCallHooksEvent } from '../../events';
import { CallHooksEventHandler } from '../../types';
import { DispatchFn, logEvent } from '../../../utils';

export const handleProcessOrchestrationQueue = (
  e: ProcessOrchestrationQueueEvent,
  handleCallHooks: CallHooksEventHandler,
  shiftOrchestrationQueue: () => CallHooksEvent | undefined,
  dispatch: DispatchFn
) => {
  logEvent(e);

  const callHooksEvent = shiftOrchestrationQueue();

  if (isCallHooksEvent(callHooksEvent)) {
    handleCallHooks(callHooksEvent);
  } else {
    dispatch(OrchestrationEvents.CALL_HOOKS_ERROR, new Error('Invalid CallHooksEvent'));
  }
};
