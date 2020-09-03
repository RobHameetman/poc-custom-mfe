import { ServiceHookEvents } from '../../../enums';
import { dispatchFrom } from '../../../../utils';

export type MountEvent = CustomEvent<null>;

export const mount = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceHookEvents.MOUNT, null);
};

export const isMountEvent = (value: unknown): value is MountEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<MountEvent>).type === 'string' &&
    (value as Partial<MountEvent>).type!.includes(ServiceHookEvents.MOUNT)
  );
};
