import { Loader } from 'webpack';

export const eslintLoader = (): Loader => ({
  loader: require.resolve('eslint-loader'),
  options: {
    baseConfig: undefined,
    cache: true,
    eslintPath: require.resolve('eslint'),
    formatter: require.resolve('react-dev-utils/eslintFormatter'),
    ignore: true,
    resolvePluginsRelativeTo: __dirname,
    useEslintrc: true,
  },
});
