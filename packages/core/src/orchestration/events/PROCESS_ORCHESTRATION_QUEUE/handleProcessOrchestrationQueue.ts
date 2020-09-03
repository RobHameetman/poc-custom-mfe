import { OrchestrationEvents } from '../../enums';
import { CallHooksEvent, ProcessOrchestrationQueueEvent, isCallHooksEvent } from '../../events';
import { CallHooksEventHandler } from '../../types';
import { DispatchFn } from '../../../utils';

export const handleProcessOrchestrationQueue = (
  _: ProcessOrchestrationQueueEvent,
  handleCallHooks: CallHooksEventHandler,
  shiftOrchestrationQueue: () => CallHooksEvent | undefined,
  dispatch: DispatchFn
) => {
  const callHooksEvent = shiftOrchestrationQueue();

  if (isCallHooksEvent(callHooksEvent)) {
    handleCallHooks(callHooksEvent);
  } else {
    dispatch(OrchestrationEvents.CALL_HOOKS_ERROR, new Error('Invalid CallHooksEvent'));
  }
};
