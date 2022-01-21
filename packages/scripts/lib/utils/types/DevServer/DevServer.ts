import chalk from 'chalk';
import inquirer from 'inquirer';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Browser } from '../Browser';
import { Compiler } from '../Compiler';
import { isPortTaken } from '../../functions';

export class DevServer {
  config: WebpackDevServer.Configuration = {};

  public get host(): string {
    return this._host;
  }

  public get port(): number {
    return this._port;
  }

  private readonly _browser = new Browser();

  private _compiler: Compiler;

  private _wds: WebpackDevServer;

  private _host = process.env.HOST || 'localhost';

  private _port = Number(process.env.PORT || 3000);

  constructor(compiler: Compiler) {
    this._compiler = compiler;
    this._wds = new WebpackDevServer(this._compiler.get() as webpack.Compiler);
  }

  async start(): Promise<void | never> {
    if (await isPortTaken(this._port)) {
      this._useAlternativePortOrExit();

      return;
    }

    this._wds.listen(
      this.port,
      this.host,
      async (err: NodeJS.ErrnoException | undefined): Promise<void | never> => {
        if (err) {
          return;
        }

        if (process.stdout.isTTY) {
          console.clear();
        }

        console.log(chalk`{cyan Starting the development server...\n}`);

        this._browser.open(`http://${this.host}`, this.port);
      },
    );
  }

  stop(): void {
    this._wds.close();
  }

  private _useAlternativePortOrExit = async (): Promise<void | never> => {
    const { shouldChangePort } = await inquirer.prompt({
      default: true,
      message: `${chalk.yellow(
        `Something is already running on port ${this._port}.`,
      )}\n\nWould you like to run the app on another port instead?`,
      name: 'shouldChangePort',
      type: 'confirm',
    });

    this._port += shouldChangePort ? 1 : 0;

    if (!shouldChangePort) {
      process.exit(0);
    } else {
      this.start();
    }
  };
}
