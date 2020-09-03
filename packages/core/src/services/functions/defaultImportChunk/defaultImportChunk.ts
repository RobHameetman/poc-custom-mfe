import { importFrom } from '../../../utils';

export const defaultImportChunk = async (chunk: string): Promise<void> => importFrom(chunk);
