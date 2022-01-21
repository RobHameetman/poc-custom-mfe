import { ImportEvent } from '../IMPORT';
import { importError } from '../IMPORT_ERROR';
import { importSuccess } from '../IMPORT_SUCCESS';

export const handleImport = async (e: ImportEvent): Promise<void> => {
  const { frame, importModule, path, resolve } = e.detail;

  try {
    const imported = await importModule(path);

    importSuccess(frame, imported, resolve);
  } catch (error) {
    importError(error, frame);
  }
};
