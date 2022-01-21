import webpack from 'webpack';
import { RollupBuild } from 'rollup';

export type BundlerCompilers = webpack.Compiler | RollupBuild;
