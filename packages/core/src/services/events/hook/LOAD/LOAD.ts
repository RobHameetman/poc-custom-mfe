import { AppFrameElement } from '../../../components';
import { ServiceHookEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type LoadEvent = CustomEvent<AsyncDetail<LoadEventDetail>>;

export interface LoadEventDetail {
  readonly frame: AppFrameElement;
}

export const load = async (frame: AppFrameElement): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<LoadEventDetail>(ServiceHookEvents.LOAD, { frame });
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
