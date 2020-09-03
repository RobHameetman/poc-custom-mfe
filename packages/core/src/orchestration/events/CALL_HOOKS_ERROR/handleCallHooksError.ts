import { CallHooksErrorEvent } from './CALL_HOOKS_ERROR';
import { OrchestrationEvents } from '../../enums';
import { DispatchFn } from '../../../utils';

export const handleCallHooksError = (
  _: CallHooksErrorEvent,
  dispatch: DispatchFn,
  shouldProcessOrchestrationQueue: () => boolean,
  end: () => void,
): void => {
  end();

  if (shouldProcessOrchestrationQueue()) {
    dispatch(OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE, null);
  }
};
