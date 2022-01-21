import { importFrom } from '../../../utils';

export const defaultImport = async (path: string): Promise<System.Module> =>
  importFrom(path);
