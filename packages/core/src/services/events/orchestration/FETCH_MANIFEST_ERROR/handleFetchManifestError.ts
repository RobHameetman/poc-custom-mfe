import { ServiceStatuses } from '../../../enums';
import { FetchManifestErrorEvent } from './FETCH_MANIFEST_ERROR';

export const handleFetchManifestError = (e: FetchManifestErrorEvent): void => {
  const { frame, resolve } = e.detail;

  frame.setStatus(ServiceStatuses.LOAD_ERROR);
  resolve();
};
