import { FetchManifestSuccessEvent } from './FETCH_MANIFEST_SUCCESS';

export const handleFetchManifestSuccess = async (
  e: FetchManifestSuccessEvent,
): Promise<void> => {
  const { frame, manifest, resolve } = e.detail;

  frame.manifest = manifest;

  return resolve(manifest);
};
