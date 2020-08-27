import { Rule } from 'webpack';
import { PATHS_APP_SRC_DIR } from '../../../enums';
import { tsLoader } from '../../loaders';

export const tsRule = (): Rule => ({
  include: PATHS_APP_SRC_DIR,
  loader: tsLoader(),
  test: /\.(ts|tsx)$/,
});
