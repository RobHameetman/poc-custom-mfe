import { BundlerCompilers } from '../BundlerCompilers';
import { NodeEnv } from '../../enums';

export interface Compiler<B extends BundlerCompilers = BundlerCompilers> {
  build(mode: NodeEnv): Promise<void>;
  get(): B | undefined;
}
