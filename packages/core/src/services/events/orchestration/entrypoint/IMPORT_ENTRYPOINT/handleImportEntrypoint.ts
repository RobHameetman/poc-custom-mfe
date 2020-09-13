import { ImportEntrypointEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportEntrypoint = (e: ImportEntrypointEvent): void => {
  logEvent(e);

  // TODO
};
