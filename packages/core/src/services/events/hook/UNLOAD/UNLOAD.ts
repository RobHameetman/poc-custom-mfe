import { AppFrameElement } from '../../../components';
import { ServiceHookEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type UnloadEvent = CustomEvent<AsyncDetail<UnloadEventDetail>>;

export interface UnloadEventDetail {
  readonly frame: AppFrameElement
}

export const unload = async (frame: AppFrameElement): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<UnloadEventDetail>(ServiceHookEvents.UNLOAD, { frame });
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
