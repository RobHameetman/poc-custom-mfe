import { importFrom } from '../../../utils';

export const defaultImportStylesheet = async (filepath: string): Promise<void> =>
  importFrom(filepath);
