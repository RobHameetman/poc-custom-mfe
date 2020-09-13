import { CallHooksErrorEvent } from './CALL_HOOKS_ERROR';
import { OrchestrationEvents } from '../../enums';
import { DispatchFn, logEvent } from '../../../utils';

export const handleCallHooksError = (
  e: CallHooksErrorEvent,
  dispatch: DispatchFn,
  shouldProcessOrchestrationQueue: () => boolean,
  end: () => void,
): void => {
  logEvent(e);

  end();

  if (shouldProcessOrchestrationQueue()) {
    dispatch(OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE, null);
  }
};
