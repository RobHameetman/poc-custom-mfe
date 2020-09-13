import { ImportEntrypointErrorEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportEntrypointError = (e: ImportEntrypointErrorEvent): void => {
  logEvent(e);

  // TODO
};
