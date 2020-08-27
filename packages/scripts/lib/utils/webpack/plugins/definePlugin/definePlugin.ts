import webpack, { Plugin } from 'webpack';
import { WebpackEnv } from '../../../types';

export const definePlugin = (env: WebpackEnv): Plugin => new webpack.DefinePlugin(env.stringified);
