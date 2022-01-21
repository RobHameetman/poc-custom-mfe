import { AppFrameElement, ServiceStatuses } from '../../../services';

/**
 * Not the same as a `RouteValidationFn`. This is the method the `AppFrameElement`
 * uses to call a service's `RouteValidationFn`. Using the current route, it
 * determines whether or not a service should be loaded.
 *
 * @see RouteValidationFn
 */
export type ServiceValidationFn = (
  service: AppFrameElement,
  status: ServiceStatuses,
) => boolean;
