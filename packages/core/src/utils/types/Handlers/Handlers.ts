import { OrchestrationEventHandlers } from '../../../orchestration';
import { RegistrationEventHandlers } from '../../../registration';
import { RenderingEventHandlers } from '../../../rendering';
import { RoutingEventHandlers } from '../../../routing';
import { ServiceEventHandlers } from '../../../services';

export type Handlers =
  | OrchestrationEventHandlers
  | RegistrationEventHandlers
  | RenderingEventHandlers
  | RoutingEventHandlers
  | ServiceEventHandlers;
