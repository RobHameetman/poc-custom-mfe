export enum OrchestrationErrors {
  InvalidCallHooksEvent = 'ERROR_INVALID_CALL_HOOKS_EVENT',
  InvalidCallHooksErrorEvent = 'ERROR_INVALID_CALL_HOOKS_ERROR_EVENT',
  InvalidCallHooksSuccessEvent = 'ERROR_INVALID_CALL_HOOKS_SUCCESS_EVENT',
  InvalidProcessOrchestrationQueueEvent = 'ERROR_INVALID_PROCESS_ORCHESTRATION_QUEUE_EVENT',
  InvalidRerouteUrlOnlyEvent = 'ERROR_INVALID_REROUTE_URL_ONLY_EVENT',
  InvalidSetOrchestratorListeningEvent = 'ERROR_SET_ORCHESTRATOR_LISTENING_EVENT',
  InvalidStartEvent = 'ERROR_START_EVENT',
  InvalidStopEvent = 'ERROR_STOP_EVENT',
  StartNotCalled = 'ERROR_START_NOT_CALLED',
}
