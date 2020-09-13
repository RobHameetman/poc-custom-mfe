import { ImportManifestSuccessEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportManifestSuccess = (e: ImportManifestSuccessEvent): void => {
  logEvent(e);

  // TODO
};
