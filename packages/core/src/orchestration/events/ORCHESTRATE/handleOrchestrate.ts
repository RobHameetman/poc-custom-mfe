import { OrchestrateEvent } from './ORCHESTRATE';
import { HandleCallHooksServiceAgent } from '../../types';
import { load, unload, mount, unmount } from '../../../services';

export const handleOrchestrate = (
  e: OrchestrateEvent,
  isOrchestrating: boolean,
  pushToOrchestrationQueue: (e: OrchestrateEvent) => void,
  getServicesToUpdate: () => HandleCallHooksServiceAgent,
  isRunning: () => boolean,
  setIsOrchestratingToTrue: () => void,
) => {
  const { reject, resolve } = e.detail;

  try {
    if (isOrchestrating) {
      pushToOrchestrationQueue(e);
  
      return;
    }
  
    const services = getServicesToUpdate();

    console.log('services:', services);
  
    if (isRunning()) {
      setIsOrchestratingToTrue();
  
      services.toUnmount.forEach(unmount);
      services.toUnload.forEach(unload);
  
      services.toLoad.forEach(load);
      services.toMount.forEach(mount);
    } else {
      services.toLoad.forEach(load);
    }
  
    resolve();
  } catch (error) {
    reject(error);
  }
};
