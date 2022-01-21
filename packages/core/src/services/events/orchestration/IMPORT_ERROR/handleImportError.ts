import { ServiceStatuses } from '../../../enums';
import { ImportErrorEvent } from './IMPORT_ERROR';

export const handleImportError = (e: ImportErrorEvent): void => {
  const { frame, resolve } = e.detail;

  frame.setStatus(ServiceStatuses.LOAD_ERROR);
  resolve();
};
