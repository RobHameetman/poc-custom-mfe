import { OrchestrationEventHandler } from '../../../orchestration';
import { RegistrationEventHandler } from '../../../registration';
import { RoutingEventHandler } from '../../../routing';
import { ServiceEventHandler } from '../../../services';

export type Handler =
  | OrchestrationEventHandler
  | RegistrationEventHandler
  | RoutingEventHandler
  | ServiceEventHandler;
