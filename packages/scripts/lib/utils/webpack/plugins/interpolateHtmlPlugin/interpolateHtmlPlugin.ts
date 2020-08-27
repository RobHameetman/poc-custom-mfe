import { Plugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import { WebpackEnv } from '../../../types';

export const interpolateHtmlPlugin = (env: WebpackEnv): Plugin =>
	new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw);
