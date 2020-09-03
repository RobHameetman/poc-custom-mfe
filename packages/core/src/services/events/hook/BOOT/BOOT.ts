import { ServiceHookEvents } from '../../../enums';
import { dispatchFrom } from '../../../../utils';

export type BootEvent = CustomEvent<null>;

export const boot = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceHookEvents.BOOT, null);
};

export const isBootEvent = (value: unknown): value is BootEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<BootEvent>).type === 'string' &&
    (value as Partial<BootEvent>).type!.includes(
      ServiceHookEvents.BOOT,
    )
  );
};
