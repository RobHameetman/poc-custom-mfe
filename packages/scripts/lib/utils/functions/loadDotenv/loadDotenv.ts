import { existsSync } from 'fs';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { NODE_ENV, PATHS_APP_DOTENV } from '../../enums';

export const loadDotenv = (): void => {
  const dotenvFiles = [
    `${PATHS_APP_DOTENV}.${NODE_ENV}.local`,
    /*
     * Don't include `.env.local` for `test` environment
     * since normally you expect tests to produce the same
     * results for everyone
     */
    // !isTest(NODE_ENV) && `${PATHS_APP_DOTENV}.local`,
    `${PATHS_APP_DOTENV}.${NODE_ENV}`,
    PATHS_APP_DOTENV,
  ].filter(Boolean) as ReadonlyArray<string>;

  dotenvFiles.forEach((dotenvFile) => {
    if (existsSync(dotenvFile)) {
      dotenvExpand(
        dotenv.config({
          path: dotenvFile,
        }),
      );
    }
  });

  console.log('\n\n\n');
  console.log('PATHS_APP_DOTENV:', PATHS_APP_DOTENV);
  console.log('process.env.PORT:', process.env.PORT);
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
};
