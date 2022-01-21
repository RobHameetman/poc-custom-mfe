import { Plugin } from 'webpack';
import HtmlWepackPlugin from 'html-webpack-plugin';
import { PATHS_APP_INDEX_HTML, isProduction } from '../../../enums';

export const htmlWebpackPlugin = (): Plugin =>
  new HtmlWepackPlugin({
    inject: true,
    template: PATHS_APP_INDEX_HTML,
    ...(isProduction()
      ? {
          minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
        }
      : {}),
  });
