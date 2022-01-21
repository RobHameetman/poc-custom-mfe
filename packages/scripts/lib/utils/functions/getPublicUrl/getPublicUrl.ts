import { NODE_ENV, isDevelopment } from '../../enums';
import { importPackageJson } from '../importPackageJson';

const stubUrl = 'http://localhost:3000';
const mode = NODE_ENV;
let publicUrl = process.env.PUBLIC_URL;

export const getPublicUrl = async (): Promise<string> => {
  if (!publicUrl) {
    const packageJson = await importPackageJson();

    if (packageJson) {
      publicUrl = packageJson.homepage;
    }
  }

  if (publicUrl) {
    const normalizedUrl = publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`;
    const validUrl = new URL(normalizedUrl, stubUrl);

    return normalizedUrl.startsWith('.')
      ? isDevelopment(mode)
        ? '/'
        : normalizedUrl
      : validUrl.pathname;
  }

  return '/';
};
