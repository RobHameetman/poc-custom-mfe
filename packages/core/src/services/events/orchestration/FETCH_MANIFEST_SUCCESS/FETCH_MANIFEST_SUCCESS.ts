import { AppFrameElement } from '../../../components';
import { ServiceOrchestrationEvents } from '../../../enums';
import { Manifest } from '../../../types';
import { AsyncDetail, ResolveFn, dispatchFrom } from '../../../../utils';

export type FetchManifestSuccessEvent = CustomEvent<
  AsyncDetail<FetchManifestSuccessEventDetail>
>;

export interface FetchManifestSuccessEventDetail {
  readonly frame: AppFrameElement;
  readonly host: string;
  readonly manifest: Manifest;
  readonly resolve: ResolveFn;
}

export const fetchManifestSuccess = async (
  frame: AppFrameElement,
  host: string,
  manifest: Manifest,
  resolve: ResolveFn
): Promise<Manifest> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<FetchManifestSuccessEventDetail, Manifest>(
    ServiceOrchestrationEvents.FETCH_MANIFEST_SUCCESS,
    {
      frame,
      host,
      manifest,
      resolve,
    },
  );
};

export const fetchManifestSuccessFrom = (frame: AppFrameElement) => async (
  host: string,
  manifest: Manifest,
  resolve: ResolveFn,
): Promise<Manifest> => {
  return fetchManifestSuccess(frame, host, manifest, resolve);
};

export const isFetchManifestSuccessEvent = (
  value: unknown,
): value is FetchManifestSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<FetchManifestSuccessEvent>).type === 'string' &&
    (value as Partial<FetchManifestSuccessEvent>).type!.includes(
      ServiceOrchestrationEvents.FETCH_MANIFEST_SUCCESS,
    )
  );
};
