import { ImportStylesheetSuccessEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportStylesheetSuccess = (e: ImportStylesheetSuccessEvent): void => {
  logEvent(e);

  // TODO
};
