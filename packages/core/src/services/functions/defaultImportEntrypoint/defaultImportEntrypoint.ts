import { importFrom } from '../../../utils';

export const defaultImportEntrypoint = async (filepath: string): Promise<Record<string, unknown>> =>
  importFrom(filepath);
