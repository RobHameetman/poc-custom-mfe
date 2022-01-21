import path from 'path';
import { CompilerOptions } from 'typescript';
import { Configuration, DevtoolModuleFilenameTemplateInfo } from 'webpack';
import {
  PATHS_APP_BUILD_DIR,
  PATHS_APP_ENTRYPOINT,
  PATHS_APP_NODE_MODULES,
  PATHS_APP_SRC_DIR,
  WebpackBuildMode,
  env as getEnv,
  getNodeEnv,
  isDevelopment,
  isProduction,
  isWebpackBuildMode,
} from '../../enums';
import { EXTENSIONS } from '../extensions';
import { cssRule, eslintRule, staticImageFormatRule, tsRule } from '../rules';
import { PackageJson } from '../../types';
import {
  definePlugin,
  forkTsCheckerWebpackPlugin,
  htmlWebpackPlugin,
  manifestPlugin,
  miniCssExtractPlugin,
  optimizeCssAssetsPlugin,
  terserPlugin,
} from '../plugins';

const DEFAULT_DEVTOOL = 'source-map';

export const createWebpackConfig = (
  buildEnv = getNodeEnv(),
  publicUrl: string,
  packageJson: PackageJson,
  tsConfig?: CompilerOptions,
  isServeCmd = false,
  shellIsRunning = false,
): Configuration => {
  const isProd = isProduction(buildEnv);
  const isDev = isDevelopment(buildEnv);

  const mode: WebpackBuildMode | undefined = isWebpackBuildMode(buildEnv) ? buildEnv : undefined;

  const envVars = getEnv(publicUrl);
  const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000', 10);

  let chunkFilename;
  let devtoolModuleFilenameTemplate;
  let filename;

  if (isProd) {
    chunkFilename = 'static/js/[name].[contenthash:8].chunk.js';
    devtoolModuleFilenameTemplate = (info: DevtoolModuleFilenameTemplateInfo) =>
      path.relative(PATHS_APP_SRC_DIR, info.absoluteResourcePath).replace(/\\/g, '/');
    filename = 'static/js/[name].[contenthash:8]';
  } else if (isDev) {
    chunkFilename = 'static/js/[name].chunk.js';
    devtoolModuleFilenameTemplate = (info: DevtoolModuleFilenameTemplateInfo) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
    filename = 'static/js/bundle.js';
  }

  return {
    bail: isProd,
    devtool: isProd ? false : DEFAULT_DEVTOOL,
    entry: isDev
      ? ['react-dev-utils/webpackHotDevClient', PATHS_APP_ENTRYPOINT]
      : PATHS_APP_ENTRYPOINT,
    mode,
    module: {
      rules: [
        { parser: { requireEnsure: false, system: false } },
        eslintRule(),
        {
          oneOf: [staticImageFormatRule(imageInlineSizeLimit), tsRule(), cssRule(publicUrl)],
        },
      ],
      strictExportPresence: true,
    },
    node: {
      child_process: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      module: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    optimization: {
      minimize: isProd,
      minimizer: [terserPlugin(), optimizeCssAssetsPlugin()],
      runtimeChunk: {
        name: (entrypoint: { name: string }): string => `runtime-${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        name: false,
      },
    },
    output: {
      chunkFilename,
      crossOriginLoading: 'anonymous',
      devtoolModuleFilenameTemplate,
      filename,
      futureEmitAssets: true,
      globalObject: 'this',
      jsonpFunction: `webpackJsonp${packageJson.name}`,
      libraryTarget:
        (tsConfig?.module as string | undefined) === 'system' &&
        (isProd || (isDev && isServeCmd && shellIsRunning))
          ? 'system'
          : 'var',
      path: isProd ? PATHS_APP_BUILD_DIR : undefined,
      pathinfo: isDev,
      publicPath: publicUrl,
    },
    performance: false,
    plugins: [
      htmlWebpackPlugin(),
      manifestPlugin(publicUrl),
      definePlugin(envVars),
      forkTsCheckerWebpackPlugin(),
    ].concat([miniCssExtractPlugin()].filter(() => isProd)),
    resolve: {
      extensions: EXTENSIONS,
      modules: ['node_modules', PATHS_APP_NODE_MODULES],
      plugins: [],
    },
  };
};
