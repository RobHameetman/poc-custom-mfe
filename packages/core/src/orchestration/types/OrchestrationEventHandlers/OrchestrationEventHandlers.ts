import {
  OrchestrateEventHandler,
  OrchestrationErrorEventHandler,
  ProcessOrchestrationQueueEventHandler,
  RerouteUrlOnlyEventHandler,
  SetOrchestratorListeningEventHandler,
} from '../OrchestrationEventHandler';
import { OrchestrationEvents } from '../../enums';

export interface OrchestrationEventHandlers {
  readonly [OrchestrationEvents.ORCHESTRATE]?: OrchestrateEventHandler;
  readonly [OrchestrationEvents.ORCHESTRATION_ERROR]?: OrchestrationErrorEventHandler;
  readonly [OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE]?: ProcessOrchestrationQueueEventHandler;
  readonly [OrchestrationEvents.REROUTE_URL_ONLY]?: RerouteUrlOnlyEventHandler;
  readonly [OrchestrationEvents.SET_ORCHESTRATOR_LISTENING]?: SetOrchestratorListeningEventHandler;
}
