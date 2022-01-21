import { getPublicUrl } from '../getPublicUrl';
import { importPackageJson } from '../importPackageJson';
import { importTsconfigJson } from '../importTsconfigJson';
import { isShellRunning } from '../isShellRunning';
import { Bundler, NodeEnv } from '../../enums';
import { BuildPipeline } from '../../types';

export const createBuildPipeline = async (
  buildEnv: NodeEnv,
  bundler: Bundler,
  isServeCmd = false,
): Promise<BuildPipeline> => {
  const PUBLIC_URL = await getPublicUrl();
  const PACKAGE_JSON = await importPackageJson();
  const TS_CONFIG = await importTsconfigJson();
  const shellIsRunning = await isShellRunning();

  if (!PACKAGE_JSON) {
    throw new Error('Could not find package.json');
  }

  return new BuildPipeline(
    bundler,
    buildEnv,
    PUBLIC_URL,
    PACKAGE_JSON,
    TS_CONFIG,
    isServeCmd,
    shellIsRunning,
  );
};
