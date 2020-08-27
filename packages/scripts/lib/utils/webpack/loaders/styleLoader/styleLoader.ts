import { Loader } from 'webpack';

export const styleLoader = (): Loader => ({
  loader: require.resolve('style-loader'),
  options: {},
});
