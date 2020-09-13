import { ImportStylesheetErrorEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportStylesheetError = (e: ImportStylesheetErrorEvent): void => {
  logEvent(e);

  // TODO
};
