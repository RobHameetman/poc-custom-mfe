import { existsSync } from 'fs';
import { Configuration } from 'webpack';
import { Application } from 'express';
import { ProxyConfigArray, ProxyConfigMap } from 'webpack-dev-server';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware';
import ignoredFiles from 'react-dev-utils/ignoredFiles';
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware';
import redirectServedPathMiddleware from 'react-dev-utils/redirectServedPathMiddleware';
import { PATHS_APP_PROXY_SETUP, PATHS_APP_PUBLIC_DIR, PATHS_APP_SRC_DIR } from '../../enums';
import { getPublicUrl } from '../../functions';

export type WebpackDevServerConfig = Configuration['devServer'];
export type ProxySetupFn = (app: Application) => void;

export const configureDevServer = async (
  proxy: ProxyConfigMap | ProxyConfigArray,
  allowedHost: string,
): Promise<WebpackDevServerConfig> => {
  const PUBLIC_PATH = await getPublicUrl();
  let proxySetup: ProxySetupFn | undefined;

  if (existsSync(PATHS_APP_PROXY_SETUP)) {
    proxySetup = await import(PATHS_APP_PROXY_SETUP);
  }

  return {
    after(app) {
      app.use(noopServiceWorkerMiddleware(PUBLIC_PATH));
    },
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());

      if (proxySetup) {
        proxySetup(app);
      }

      app.use(redirectServedPathMiddleware(PUBLIC_PATH));
    },
    clientLogLevel: 'none',
    compress: true,
    contentBase: PATHS_APP_PUBLIC_DIR,
    contentBasePublicPath: PUBLIC_PATH,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      disableDotRule: true,
      index: PUBLIC_PATH,
    },
    hot: true,
    https: false,
    injectClient: false,
    open: {
      app: [
        'Google Chrome',
        '--disable-web-security', // to enable CORS
      ],
    },
    overlay: false,
    proxy,
    public: allowedHost,
    publicPath: PUBLIC_PATH,
    quiet: true,
    sockHost: process.env.WDS_SOCKET_HOST,
    sockPath: process.env.WDS_SOCKET_PATH,
    sockPort: process.env.WDS_SOCKET_PORT,
    transportMode: 'ws',
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: ignoredFiles(PATHS_APP_SRC_DIR),
      poll: 1000,
    },
  };
};
