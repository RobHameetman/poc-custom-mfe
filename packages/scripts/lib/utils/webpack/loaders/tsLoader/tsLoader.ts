import { Loader } from 'webpack';

export const tsLoader = (): Loader => ({
  loader: require.resolve('ts-loader'),
  options: {},
});
