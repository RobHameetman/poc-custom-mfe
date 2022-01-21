import { AppFrameElement } from '../../../components';
import { ServiceHookEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type UnmountEvent = CustomEvent<AsyncDetail<UnmountEventDetail>>;

export interface UnmountEventDetail {
  readonly frame: AppFrameElement;
}

export const unmount = async (frame: AppFrameElement): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<UnmountEventDetail>(ServiceHookEvents.UNMOUNT, { frame });
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
