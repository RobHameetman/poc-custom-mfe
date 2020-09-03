import { ServiceHookEvents } from '../../../enums';
import { dispatchFrom } from '../../../../utils';

export type UnloadEvent = CustomEvent<null>;

export const unload = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceHookEvents.UNLOAD, null);
};

export const isUnloadEvent = (value: unknown): value is UnloadEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<UnloadEvent>).type === 'string' &&
    (value as Partial<UnloadEvent>).type!.includes(ServiceHookEvents.UNLOAD)
  );
};
