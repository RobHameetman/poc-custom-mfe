import { ServiceHookEvents } from '../../../enums';
import { dispatchFrom } from '../../../../utils';

export type UnmountEvent = CustomEvent<null>;

export const unmount = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceHookEvents.UNMOUNT, null);
};

export const isUnmountEvent = (value: unknown): value is UnmountEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<UnmountEvent>).type === 'string' &&
    (value as Partial<UnmountEvent>).type!.includes(ServiceHookEvents.UNMOUNT)
  );
};
