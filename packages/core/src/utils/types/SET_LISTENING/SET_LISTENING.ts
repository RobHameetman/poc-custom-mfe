import { OrchestrationEvents } from '../../../orchestration';
import { RegistrationEvents } from '../../../registration';
import { RoutingEvents } from '../../../routing';
import { ServiceOrchestrationEvents } from '../../../services';

export type SET_LISTENING =
  | OrchestrationEvents.SET_ORCHESTRATOR_LISTENING
  | RegistrationEvents.SET_REGISTRY_LISTENING
  | RoutingEvents.SET_ROUTER_LISTENING
  | ServiceOrchestrationEvents.SET_SERVICE_LISTENING;
