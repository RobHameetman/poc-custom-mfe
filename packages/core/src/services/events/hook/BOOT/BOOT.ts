import { AppFrameElement } from '../../../components';
import { ServiceHookEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type BootEvent = CustomEvent<AsyncDetail<BootEventDetail>>;

export interface BootEventDetail {
  readonly frame: AppFrameElement;
}

export const boot = async (frame: AppFrameElement): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<BootEventDetail>(ServiceHookEvents.BOOT, { frame });
};

export const isBootEvent = (value: unknown): value is BootEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<BootEvent>).type === 'string' &&
    (value as Partial<BootEvent>).type!.includes(ServiceHookEvents.BOOT)
  );
};
