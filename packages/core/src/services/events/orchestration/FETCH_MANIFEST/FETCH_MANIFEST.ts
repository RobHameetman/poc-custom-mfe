import { AppFrameElement } from '../../../components';
import { ServiceOrchestrationEvents } from '../../../enums';
import { Manifest } from '../../../types';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type FetchManifestEvent = CustomEvent<
  AsyncDetail<FetchManifestEventDetail>
>;

export interface FetchManifestEventDetail {
  readonly frame: AppFrameElement;
  readonly host: string;
}

export const fetchManifest = async (
  host: string,
  frame: AppFrameElement,
): Promise<Manifest> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<FetchManifestEventDetail, Manifest>(
    ServiceOrchestrationEvents.FETCH_MANIFEST,
    { frame, host },
  );
};

export const fetchManifestFrom = (frame: AppFrameElement) => async (
  host: string,
): Promise<Manifest> => {
  return fetchManifest(host, frame);
};

export const isFetchManifestEvent = (
  value: unknown,
): value is FetchManifestEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<FetchManifestEvent>).type === 'string' &&
    (value as Partial<FetchManifestEvent>).type!.includes(
      ServiceOrchestrationEvents.FETCH_MANIFEST,
    )
  );
};
