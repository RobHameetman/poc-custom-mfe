import { OrchestrationEventHandlers } from '../../../orchestration';
import { RegistrationEventHandlers } from '../../../registration';
import { RoutingEventHandlers } from '../../../routing';
import { ServiceEventHandlers } from '../../../services';

export type Handlers =
  | OrchestrationEventHandlers
  | RegistrationEventHandlers
  | RoutingEventHandlers
  | ServiceEventHandlers;
