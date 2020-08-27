import { Plugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { isProduction } from '../../../enums';

export const terserPlugin = (): Plugin =>
	new TerserPlugin({
		terserOptions: {
			compress: {
				comparisons: false,
				ecma: 5,
				inline: 2,
				warnings: false,
			},
			keep_classnames: isProduction(),
			keep_fnames: isProduction(),
			mangle: {
				safari10: true,
			},
			output: {
				ascii_only: true,
				comments: false,
				ecma: 5,
			},
			parse: {
				ecma: 8,
			},
			sourceMap: true,
		},
	});
