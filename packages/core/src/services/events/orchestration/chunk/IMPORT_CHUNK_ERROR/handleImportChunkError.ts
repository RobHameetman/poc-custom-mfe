import { ImportChunkErrorEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportChunkError = (e: ImportChunkErrorEvent): void => {
  logEvent(e);

  // TODO
};
