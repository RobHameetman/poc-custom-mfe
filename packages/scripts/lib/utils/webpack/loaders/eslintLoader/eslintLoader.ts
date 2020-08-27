import { Loader } from 'webpack';

export const eslintLoader = (): Loader => ({
  loader: require.resolve('eslint-loader'),
  options: {
    baseConfig: {
      extends: [require.resolve('@rob.hameetman/eslint-config')],
    },
    cache: true,
    eslintPath: require.resolve('eslint'),
    formatter: require.resolve('react-dev-utils/eslintFormatter'),
    resolvePluginsRelativeTo: __dirname,
  },
});
