import { CallHooksResolvedEvent } from './CALL_HOOKS_RESOLVED';
import { OrchestrationEvents } from '../../enums';
import { DispatchFn, logEvent } from '../../../utils';

export const handleCallHooksResolved = (
  e: CallHooksResolvedEvent,
  dispatch: DispatchFn,
  shouldProcessOrchestrationQueue: () => boolean,
  end: () => void,
) => {
  logEvent(e);

  end();

  if (shouldProcessOrchestrationQueue()) {
    dispatch(OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE, null);
  }
};
