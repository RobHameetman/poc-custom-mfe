import { OrchestrationEvents } from '../../../orchestration';
import { RegistrationEvents } from '../../../registration';
import { RenderingEvents } from '../../../rendering';
import { RoutingEvents } from '../../../routing';
import { ServiceOrchestrationEvents } from '../../../services';

export type SET_LISTENING =
  | OrchestrationEvents.SET_ORCHESTRATOR_LISTENING
  | RegistrationEvents.SET_REGISTRY_LISTENING
  | RenderingEvents.SET_RENDERER_LISTENING
  | RoutingEvents.SET_ROUTER_LISTENING
  | ServiceOrchestrationEvents.SET_SERVICE_LISTENING;
