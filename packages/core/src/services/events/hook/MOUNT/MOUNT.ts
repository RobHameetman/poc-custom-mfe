import { AppFrameElement } from '../../../components';
import { ServiceHookEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type MountEvent = CustomEvent<AsyncDetail<MountEventDetail>>;

export interface MountEventDetail {
  readonly frame: AppFrameElement;
}

export const mount = async (frame: AppFrameElement): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<MountEventDetail>(ServiceHookEvents.MOUNT, { frame });
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
