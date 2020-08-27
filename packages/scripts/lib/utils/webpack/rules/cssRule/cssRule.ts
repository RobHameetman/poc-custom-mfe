import { Rule } from 'webpack';
import { cssLoader, miniCssExtractPluginLoader, postcssLoader, styleLoader } from '../../loaders';
import { isDevelopment, isProduction } from '../../../enums';

export const cssRule = (PUBLIC_URL: string): Rule => ({
  test: /(\.module)?\.css$/,
  use: [cssLoader(), postcssLoader()]
    .concat([styleLoader()].filter(() => isDevelopment()))
    .concat([miniCssExtractPluginLoader(PUBLIC_URL)].filter(() => isProduction())),
});
