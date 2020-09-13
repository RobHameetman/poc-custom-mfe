import { OrchestrationEvents } from '../../../orchestration';
import { RegistrationEvents } from '../../../registration';
import { RenderingEvents } from '../../../rendering';
import { RoutingEvents } from '../../../routing';
import {
  ServiceHookEvents,
  ServiceOrchestrationEvents,
} from '../../../services';

export type OmniframeEvent = CustomEvent<
  | OrchestrationEvents
  | RegistrationEvents
  | RenderingEvents
  | RoutingEvents
  | ServiceHookEvents
  | ServiceOrchestrationEvents
>;
