import { AppFrameElement } from '../../../components';
import { ServiceOrchestrationEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type FetchManifestErrorEvent = CustomEvent<
  AsyncDetail<FetchManifestErrorEventDetail>
>;

export interface FetchManifestErrorEventDetail {
  readonly error: Error;
  readonly frame: AppFrameElement;
}

export const fetchManifestError = async (
  error: Error,
  frame: AppFrameElement,
): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<FetchManifestErrorEventDetail>(
    ServiceOrchestrationEvents.FETCH_MANIFEST_ERROR,
    { error, frame },
  );
};

export const fetchManifestErrorFrom = (frame: AppFrameElement) => async (
  error: Error,
): Promise<void> => {
  return fetchManifestError(error, frame);
};

export const isFetchManifestErrorEvent = (
  value: unknown,
): value is FetchManifestErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<FetchManifestErrorEvent>).type === 'string' &&
    (value as Partial<FetchManifestErrorEvent>).type!.includes(
      ServiceOrchestrationEvents.FETCH_MANIFEST_ERROR,
    )
  );
};
