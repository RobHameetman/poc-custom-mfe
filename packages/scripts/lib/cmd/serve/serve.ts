import { Bundler, NodeEnv, Structure, createBuildPipeline } from '../../utils';

export const serve = async (structure: Structure, buildEnv: NodeEnv): Promise<void> => {
  console.clear();
  console.log('Starting an optimized development server...\n');

  const pipeline = await createBuildPipeline(buildEnv, Bundler.Webpack, true);

  await pipeline.serve(buildEnv);
};
