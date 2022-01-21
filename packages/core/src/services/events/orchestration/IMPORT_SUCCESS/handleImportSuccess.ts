import { ImportSuccessEvent } from './IMPORT_SUCCESS';

export const handleImportSuccess = async (
  e: ImportSuccessEvent,
): Promise<void> => {
  const { imported, resolve } = e.detail;

  return resolve(imported);
};
