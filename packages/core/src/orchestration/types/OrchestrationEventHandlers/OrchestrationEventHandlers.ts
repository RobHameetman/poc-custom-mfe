import {
  CallHooksEventHandler,
  CallHooksErrorEventHandler,
  CallHooksResolvedEventHandler,
  OrchestrationEventHandler,
  ProcessOrchestrationQueueEventHandler,
  RerouteUrlOnlyEventHandler,
  SetOrchestratorListeningEventHandler,
} from '../OrchestrationEventHandler';
import { OrchestrationEvents } from '../../enums';

export interface OrchestrationEventHandlers {
  [OrchestrationEvents.CALL_HOOKS]: CallHooksEventHandler;
  [OrchestrationEvents.CALL_HOOKS_ERROR]: CallHooksErrorEventHandler;
  [OrchestrationEvents.CALL_HOOKS_RESOLVED]: CallHooksResolvedEventHandler;
  [OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE]: ProcessOrchestrationQueueEventHandler;
  [OrchestrationEvents.REROUTE_URL_ONLY]: RerouteUrlOnlyEventHandler;
  [OrchestrationEvents.SET_ORCHESTRATOR_LISTENING]: SetOrchestratorListeningEventHandler;
  [key: string]: OrchestrationEventHandler;
}
