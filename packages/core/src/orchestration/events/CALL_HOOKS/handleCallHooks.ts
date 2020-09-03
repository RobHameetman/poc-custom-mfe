import { CallHooksEvent } from './CALL_HOOKS';
import { load, unload, mount, unmount } from '../../hooks';
import { HandleCallHooksServiceAgent } from '../../types';

export const handleCallHooks = (
  e: CallHooksEvent,
  isOrchestrating: boolean,
  pushToOrchestrationQueue: (e: CallHooksEvent) => void,
  getServicesToUpdate: () => HandleCallHooksServiceAgent,
  isRunning: () => boolean,
  setIsOrchestratingToTrue: () => void
) => {
  if (isOrchestrating) {
    pushToOrchestrationQueue(e);

    return;
  }

  const services = getServicesToUpdate();

  if (isRunning()) {
    setIsOrchestratingToTrue();

    services.toUnmount.forEach(unmount);
    services.toUnload.forEach(unload);

    services.toLoad.forEach(load);
    services.toMount.forEach(mount);
  } else {
    services.toLoad.forEach(load);
  }
};
