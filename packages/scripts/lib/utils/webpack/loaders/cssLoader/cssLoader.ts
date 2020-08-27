import { Loader } from 'webpack';
import getCssModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import { isProduction } from '../../../enums';

export const cssLoader = (): Loader => ({
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    modules: {
      getLocalIdent: getCssModuleLocalIdent,
    },
    sourceMap: isProduction(),
  },
});
