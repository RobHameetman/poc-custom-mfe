import {
  $$InitEvent,
  CallHooksEvent,
  CallHooksErrorEvent,
  CallHooksResolvedEvent,
  DefineCustomElementsEvent,
  ProcessOrchestrationQueueEvent,
  RerouteUrlOnlyEvent,
  SetOrchestratorListeningEvent,
} from '../../events';

export type $$InitEventHandler = (e: $$InitEvent) => void;
export type CallHooksEventHandler = (e: CallHooksEvent) => void;
export type CallHooksErrorEventHandler = (e: CallHooksErrorEvent) => void;
export type CallHooksResolvedEventHandler = (e: CallHooksResolvedEvent) => void;
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
  | CallHooksEventHandler
  | CallHooksErrorEventHandler
  | CallHooksResolvedEventHandler
  | DefineCustomElementsEventHandler
  | ProcessOrchestrationQueueEventHandler
  | RerouteUrlOnlyEventHandler
  | SetOrchestratorListeningEventHandler;
