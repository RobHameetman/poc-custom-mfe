import { CompilerOptions } from 'typescript';
import { Configuration } from 'webpack';
import { DevServer } from '../DevServer';
import { Compiler } from '../Compiler';
import { WebpackCompiler } from '../WebpackCompiler';
import { Bundler, NodeEnv, NodeEnvs } from '../../enums';
import { createWebpackConfig } from '../../webpack';
import { PackageJson } from '../PackageJson/PackageJson';

export type CompilerConfig = Record<string, unknown> | Configuration;

export class BuildPipeline {
  readonly bundler: Bundler;

  mode: NodeEnv = NodeEnvs.development;

  private _config: CompilerConfig;

  private _compiler: Compiler;

  private _devServer: DevServer | undefined;

  constructor(
    bundler: Bundler = Bundler.Webpack,
    mode: NodeEnv = NodeEnvs.development,
    publicUrl: string,
    packageJson: PackageJson,
    tsConfig?: CompilerOptions,
    isServeCmd = false,
    shellIsRunning = false,
  ) {
    this.bundler = bundler;

    if (mode) {
      this.mode = mode;
    }

    this._config = createWebpackConfig(this.mode, publicUrl, packageJson, tsConfig);

    switch (this.bundler) {
      default:
        this._compiler = new WebpackCompiler(this._config);
        break;
    }
  }

  async build(mode?: NodeEnv): Promise<void> {
    try {
      if (mode) {
        this.mode = mode;
      }

      if (this._compiler) {
        this._compiler.build(this.mode);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async serve(mode: NodeEnv): Promise<void> {
    if (mode) {
      this.mode = mode;
    }

    if (this._compiler) {
      this._devServer = new DevServer(this._compiler);
      await this._devServer.start();
    }
  }
}
