import chalk from 'chalk';
import webpack, { Configuration } from 'webpack';
import { NodeEnv } from '../../enums';
import { Compiler } from '../Compiler';

export class WebpackCompiler implements Compiler<webpack.Compiler> {
  get config(): Readonly<Configuration> {
    return this._config;
  }

  private _compiler: webpack.Compiler;

  private _config: Readonly<Configuration>;

  constructor(config: Readonly<Configuration>) {
    this._config = config;
    this._compiler = webpack(config);
  }

  async build(mode: NodeEnv): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._compiler) {
        return reject(new Error('Cannot run compiler because compiler is undefined'));
      }

      this._compiler.run((err, stats) => {
        if (err) {
          return reject(err);
        }

        const { errors } = stats.compilation;

        if (errors.length) {
          errors.forEach((err) => {
            console.log(`${err.message}\n`);
          });
        }

        console.log(chalk`🚀 {green Build completed successfully}\n`);

        return resolve();
      });
    });
  }

  get(): webpack.Compiler {
    return this._compiler;
  }
}
