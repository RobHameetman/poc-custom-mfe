import chalk from 'chalk';
import WebpackDevServer from 'webpack-dev-server';
import { Compiler } from '../Compiler';
import { Browser } from '../Browser/Browser';

export class DevServer {
  config: WebpackDevServer.Configuration = {};

  host = 'localhost';

  port = 3000;

  private readonly _browser = new Browser();

  private _compiler: Compiler;

  private _wds: WebpackDevServer;

  constructor(compiler: Compiler) {
    this._compiler = compiler;
    this._wds = new WebpackDevServer(this._compiler.get());
  }

  start(): void {
    this._wds.listen(this.port, this.host, (err) => {
      if (err) {
        console.log(err);
      }

      if (process.stdout.isTTY) {
        console.clear();
      }

      console.log(chalk`{cyan Starting the development server...\n}`);

      this._browser.open(this.host, this.port);
    });
  }

  stop(): void {
    this._wds.close();
  }
}
