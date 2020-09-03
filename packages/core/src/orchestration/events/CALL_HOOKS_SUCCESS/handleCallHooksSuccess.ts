import { OrchestrationEvents } from '../../enums';
import { CallHooksSuccessEvent } from '../../events';
import { DispatchFn } from '../../../utils';

export const handleCallHooksSuccess = (
  _: CallHooksSuccessEvent,
  dispatch: DispatchFn,
  shouldProcessOrchestrationQueue: () => boolean,
  end: () => void
) => {
  end();

  if (shouldProcessOrchestrationQueue()) {
    dispatch(OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE, null);
  }
};
