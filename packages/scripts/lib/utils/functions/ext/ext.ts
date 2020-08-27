import { existsSync } from 'fs';
import { EXTENSIONS } from '../../webpack';

const DEFAULT_EXT = 'ts';

export const ext = (path: string): string => {
	const ext = EXTENSIONS.find((EXT) => existsSync(`${path}.${EXT}`)) || DEFAULT_EXT;

	return `${path}.${ext}`;
};
