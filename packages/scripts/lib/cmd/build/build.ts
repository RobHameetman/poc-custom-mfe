import { BuildEnv, Bundler, createBuildPipeline } from '../../utils';

export const build = async (buildEnv: BuildEnv): Promise<void> => {
  console.clear();
  console.log('Creating an optimized production build...\n');

  const pipeline = await createBuildPipeline(buildEnv, Bundler.Webpack);

  await pipeline.build(buildEnv);
};
