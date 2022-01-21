import { Plugin } from 'webpack';
import BrowserPlugin from 'webpack-browser-plugin';

export const browserPlugin = (): Plugin =>
  new BrowserPlugin({
    openOptions: {
      app: [
        'google chrome',
        '--disable-web-security', // to enable CORS
      ],
    },
  });
