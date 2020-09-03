import { getPublicUrl } from '../getPublicUrl';
import { importPackageJson } from '../importPackageJson';
import { BuildEnv, Bundler } from '../../enums';
import { BuildPipeline } from '../../types';

export const createBuildPipeline = async (
  buildEnv: BuildEnv,
  bundler: Bundler,
): Promise<BuildPipeline> => {
  const PUBLIC_URL = await getPublicUrl();
  const PACKAGE_JSON = await importPackageJson();

  if (!PACKAGE_JSON) {
    throw new Error('Could not find package.json');
  }

  return new BuildPipeline(bundler, buildEnv, PUBLIC_URL, PACKAGE_JSON);
};
