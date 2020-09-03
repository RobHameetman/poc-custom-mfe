import { ServiceHookEvents } from '../../../enums';
import { dispatchFrom } from '../../../../utils';

export type LoadEvent = CustomEvent<null>;

export const load = (service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceHookEvents.LOAD, null);
};

export const isLoadEvent = (value: unknown): value is LoadEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<LoadEvent>).type === 'string' &&
    (value as Partial<LoadEvent>).type!.includes(ServiceHookEvents.LOAD)
  );
};
