import { BuildEnv, Bundler, createBuildPipeline } from '../../utils';

export const serve = async (buildEnv: BuildEnv): Promise<void> => {
  console.clear();
  console.log('Starting an optimized development server...\n');

  const pipeline = await createBuildPipeline(buildEnv, Bundler.Webpack);

  await pipeline.serve(buildEnv);
};
