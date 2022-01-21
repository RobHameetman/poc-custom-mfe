import {
  $$InitEvent,
  OrchestrateEvent,
  OrchestrationErrorEvent,
  DefineCustomElementsEvent,
  ProcessOrchestrationQueueEvent,
  RerouteUrlOnlyEvent,
  SetOrchestratorListeningEvent,
} from '../../events';

export type $$InitEventHandler = (e: $$InitEvent) => void;
export type OrchestrateEventHandler = (e: OrchestrateEvent) => void;
export type OrchestrationErrorEventHandler = (
  e: OrchestrationErrorEvent,
) => void;
export type DefineCustomElementsEventHandler = (
  e: DefineCustomElementsEvent,
) => void;
export type ProcessOrchestrationQueueEventHandler = (
  e: ProcessOrchestrationQueueEvent,
) => void;
export type RerouteUrlOnlyEventHandler = (e: RerouteUrlOnlyEvent) => void;
export type SetOrchestratorListeningEventHandler = (
  e: SetOrchestratorListeningEvent,
) => void;
// export type StartEventHandler = (e: StartEvent) => void;
// export type StopEventHandler = (e: StopEvent) => void;

export type OrchestrationEventHandler =
  | $$InitEventHandler
  | OrchestrateEventHandler
  | OrchestrationErrorEventHandler
  | DefineCustomElementsEventHandler
  | ProcessOrchestrationQueueEventHandler
  | RerouteUrlOnlyEventHandler
  | SetOrchestratorListeningEventHandler;
