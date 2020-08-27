import { Rule } from 'webpack';
import { eslintLoader } from '../../loaders';
import { PATHS_APP_SRC_DIR } from '../../../enums';

export const eslintRule = (): Rule => ({
  enforce: 'pre',
  include: PATHS_APP_SRC_DIR,
  test: /\.(ts|tsx)$/,
  use: [eslintLoader()],
});
