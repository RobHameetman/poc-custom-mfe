import { ImportChunkSuccessEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleImportChunkSuccess = (e: ImportChunkSuccessEvent): void => {
  logEvent(e);

  // TODO
};
