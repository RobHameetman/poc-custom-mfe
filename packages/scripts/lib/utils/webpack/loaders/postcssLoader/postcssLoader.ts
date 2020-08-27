import { Loader } from 'webpack';
import postcssNormalize from 'postcss-normalize';

const plugins = async () => {
  const postcssFlexbugsFixes = await import('postcss-flexbugs-fixes');
  const postcssPresetEnv = await import('postcss-preset-env');

  return [
    postcssFlexbugsFixes,
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    postcssNormalize(),
  ];
};

export const postcssLoader = (isProd = true): Loader => {
  return {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins,
      sourceMap: isProd,
    },
  };
};
