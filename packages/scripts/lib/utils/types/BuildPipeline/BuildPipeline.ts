import { Configuration } from 'webpack';
import { DevServer } from '../DevServer';
import { Compiler, WebpackCompiler } from '../Compiler';
import { BuildEnv, BuildEnvs, Bundler } from '../../enums';
import { createWebpackConfig } from '../../webpack';
import { PackageJson } from '../PackageJson/PackageJson';

export type CompilerConfig = Record<string, unknown> | Configuration;

export class BuildPipeline {
  readonly bundler: Bundler;

  mode: BuildEnv = BuildEnvs.development;

  private _config: CompilerConfig;

  private _compiler: Compiler;

  private _devServer: DevServer | undefined;

  constructor(
    bundler: Bundler = Bundler.Webpack,
    mode: BuildEnv = BuildEnvs.development,
    publicUrl: string,
    packageJson: PackageJson,
  ) {
    this.bundler = bundler;

    if (mode) {
      this.mode = mode;
    }

    this._config = createWebpackConfig(this.mode, packageJson, publicUrl);

    switch (this.bundler) {
      default:
        this._compiler = new WebpackCompiler(this._config);
        break;
    }
  }

  async build(mode?: BuildEnv): Promise<void> {
    if (mode) {
      this.mode = mode;
    }

    if (this._compiler) {
      this._compiler.build(this.mode);
    }
  }

  async serve(mode: BuildEnv): Promise<void> {
    if (mode) {
      this.mode = mode;
    }

    if (this._compiler) {
      this._devServer = new DevServer(this._compiler);
      this._devServer.start();
    }
  }
}
