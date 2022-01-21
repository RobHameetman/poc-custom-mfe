import { Namespaces, OrchestrationEventHandlers } from '../../../orchestration';
import { RegistrationEventHandlers } from '../../../registration';
import { RoutingEventHandlers } from '../../../routing';
import { ServiceEventHandlers } from '../../../services';

export type NamespacedHandlers = {
  readonly [Namespaces.App]?: OrchestrationEventHandlers;
  readonly [Namespaces.Registry]?: RegistrationEventHandlers;
  readonly [Namespaces.Router]?: RoutingEventHandlers;
  readonly [key: string]:
    | OrchestrationEventHandlers
    | RegistrationEventHandlers
    | RoutingEventHandlers
    | ServiceEventHandlers
    | undefined;
  undefined?:
    | OrchestrationEventHandlers
    | RegistrationEventHandlers
    | RoutingEventHandlers
    | ServiceEventHandlers;
};
