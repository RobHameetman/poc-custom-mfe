import { importFrom } from '../../../utils';
import { Manifest } from '../../types';

export const defaultImportManifest = async (manifest: string): Promise<Manifest> =>
  importFrom<Manifest>(manifest);
