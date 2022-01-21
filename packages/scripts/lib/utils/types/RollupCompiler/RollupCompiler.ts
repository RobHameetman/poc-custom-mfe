import chalk from 'chalk';
import { OutputOptions, RollupBuild, rollup, watch } from 'rollup';
import { Compiler } from '../Compiler';
import { NodeEnv } from '../../enums';

export class RollupCompiler implements Compiler<RollupBuild> {
  get config(): Readonly<OutputOptions> {
    return this._config;
  }

  private _compiler: RollupBuild | undefined;

  private _config: Readonly<OutputOptions>;

  constructor(config: Readonly<OutputOptions>) {
    this._config = config;

    (async () => {
      this._compiler = await rollup(config);
    })();
  }

  async build(mode: NodeEnv): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._compiler) {
        return reject(new Error('Cannot run compiler because compiler is undefined'));
      }

      watch(this._config);

      console.log(chalk`🚀 {green Build completed successfully}\n`);

      return resolve();
    });
  }

  get(): RollupBuild | undefined {
    return this._compiler;
  }
}
