import { ImportEntrypointSuccessEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportEntrypointSuccess = (e: ImportEntrypointSuccessEvent): void => {
  logEvent(e);

  // TODO
};
