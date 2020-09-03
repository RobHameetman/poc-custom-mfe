import { Service, ServiceStatuses } from '../../../services';

/**
 * Not the same as a `RouteValidationFn`. This is the method the `Orchestrator`
 * uses to call a service's `RouteValidationFn`. Using the current route, it
 * determines whether or not a service should be loaded.
 *
 * @see RouteValidationFn
 */
export type ServiceValidationFn = (service: Service, status: ServiceStatuses) => boolean;
