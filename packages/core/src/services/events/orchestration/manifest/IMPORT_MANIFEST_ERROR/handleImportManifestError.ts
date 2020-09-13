import { ImportManifestErrorEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportManifestError = (e: ImportManifestErrorEvent): void => {
  logEvent(e);

  // TODO
};
