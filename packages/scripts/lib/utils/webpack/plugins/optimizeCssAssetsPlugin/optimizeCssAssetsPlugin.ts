import { Plugin } from 'webpack';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import safePostCssParser from 'postcss-safe-parser';
import { isDevelopment } from '../../../enums';

export const optimizeCssAssetsPlugin = (): Plugin =>
	new OptimizeCssAssetsPlugin({
		cssProcessorOptions: {
			map: isDevelopment()
				? {
						annotation: true,
						inline: false,
				  }
				: false,
			parser: safePostCssParser,
		},
		cssProcessorPluginOptions: {
			preset: ['default', { minifyFontValues: { removeQuotes: false } }],
		},
	});
