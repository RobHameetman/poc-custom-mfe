import { Registry } from '../../../registration';
import { AppFrameElement, ServiceStatuses } from '../../../services';

export const getServicesToLoad = (): Array<AppFrameElement> => {
  const registry = Registry.instance;

  console.log(registry.services);

  return registry.filter(
    (service) => service.status === ServiceStatuses.REGISTERED,
  );
};
