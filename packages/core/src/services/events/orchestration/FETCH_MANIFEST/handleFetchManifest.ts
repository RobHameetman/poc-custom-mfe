import { fetchManifestError } from '../FETCH_MANIFEST_ERROR';
import { fetchManifestSuccess } from '../FETCH_MANIFEST_SUCCESS';
import { isManifest } from '../../../types';
import { FetchManifestEvent } from '../..';

export const handleFetchManifest = async (
  e: FetchManifestEvent,
): Promise<void> => {
  const { frame, host, resolve } = e.detail;

  try {
    const response = await fetch(
      `${host.endsWith('/') ? host.slice(-1) : host}/asset-manifest.json`,
    );

    const manifest = await response.json();

    if (isManifest(manifest)) {
      fetchManifestSuccess(frame, host, manifest, resolve);
    } else {
      throw Error('InvalidService');
    }
  } catch (err) {
    fetchManifestError(err, frame);
  }
};
