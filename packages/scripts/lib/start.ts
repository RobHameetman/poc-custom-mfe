import { BuildPipeline, Bundler, getBuildEnv, getPublicUrl, importPackageJson } from './utils';

export const start = async (): Promise<void> => {
  try {
    console.clear();
    console.log('Creating an optimized production build...');

    const BUILD_ENV = getBuildEnv();
    const PACKAGE_JSON = await importPackageJson();
    const PUBLIC_URL = await getPublicUrl();

    if (!PACKAGE_JSON) {
      throw new Error('Could not find package.json');
    }

    const pipeline = new BuildPipeline(Bundler.Webpack, BUILD_ENV, PUBLIC_URL, PACKAGE_JSON);

    await pipeline.serve(BUILD_ENV);
  } catch (err) {
    console.error(err instanceof Error ? err : new Error(err));
  }
};
