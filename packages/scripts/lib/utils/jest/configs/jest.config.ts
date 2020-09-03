import fs from 'fs';
import chalk from 'chalk';
import { Config } from '@jest/types';
import { Paths } from '../../enums';
import { isNotSpreadable } from '../../functions';
import { EXTENSIONS } from '../../webpack';
import { PackageJsonWithJest } from '../../types';

type ResolveFn = (x: string) => string | Config.TransformerConfig;

export const createJestConfig = (
  resolve: ResolveFn,
  rootDir: string,
  isEjecting = false,
  packageJson: PackageJsonWithJest,
): Config.InitialOptions => {
  /*
   * Use this instead of `paths.testsSetup` to avoid putting
   * an absolute filename into configuration after ejecting.
   */
  const setupTestsMatches = String(Paths.appTestsSetup).match(/src[/\\]setupTests\.(.+)/);
  const setupTestsFileExtension = (setupTestsMatches && setupTestsMatches[1]) || 'js';
  const setupTestsFile = fs.existsSync(String(Paths.appTestsSetup))
    ? `<rootDir>/src/setupTests.${setupTestsFileExtension}`
    : undefined;

  const config: Config.InitialOptions = {
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    moduleFileExtensions: [...EXTENSIONS, 'node'].filter((ext) => !ext.includes('mjs')),
    moduleNameMapper: {
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    modulePaths: [],
    resetMocks: true,
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: setupTestsFile ? [setupTestsFile] : [],
    testEnvironment: 'jsdom',
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    testRunner: require.resolve('jest-circus/runner'),
    transform: {
      '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': resolve('config/jest/fileTransform.js'),
      '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': isEjecting
        ? '<rootDir>/node_modules/babel-jest'
        : resolve('config/jest/babelTransform.js'),
      '^.+\\.css$': resolve('config/jest/cssTransform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  };

  if (rootDir) {
    config.rootDir = rootDir;
  }

  const overrides = { ...packageJson.jest };

  const supportedKeys = [
    'clearMocks',
    'collectCoverageFrom',
    'coveragePathIgnorePatterns',
    'coverageReporters',
    'coverageThreshold',
    'displayName',
    'extraGlobals',
    'globalSetup',
    'globalTeardown',
    'moduleNameMapper',
    'resetMocks',
    'resetModules',
    'restoreMocks',
    'snapshotSerializers',
    'testMatch',
    'transform',
    'transformIgnorePatterns',
    'watchPathIgnorePatterns',
  ];

  if (overrides) {
    supportedKeys
      .filter((key) => key in overrides)
      .forEach((key) => {
        if (isNotSpreadable(config[key as keyof Config.InitialOptions])) {
          (config[key as keyof Config.InitialOptions] as unknown) = overrides[key];
        } else {
          (config[key as keyof Config.InitialOptions] as Record<string, unknown>) = {
            ...(config[key as keyof Config.InitialOptions] as Record<string, unknown>),
            ...(overrides[key as keyof Config.Argv] as Record<string, unknown>),
          };
        }

        delete overrides[key];
      });

    const unsupportedKeys = Object.keys(overrides);

    if (unsupportedKeys.length) {
      const isOverridingSetupFile = unsupportedKeys.indexOf('setupFilesAfterEnv') > -1;

      if (isOverridingSetupFile) {
        console.error(
          chalk.red(
            `We detected ${chalk.bold('setupFilesAfterEnv')} in your package.json.\n\n` +
              `Remove it from Jest configuration, and put the initialization code in ${chalk.bold(
                'src/setupTests.js',
              )}.\nThis file will be loaded automatically.\n`,
          ),
        );
      } else {
        console.error(
          chalk.red(
            `${
              '\nOut of the box, @microfrontend-example only supports overriding ' +
              'these Jest options:\n\n'
            }${supportedKeys.map((key) => chalk.bold(`  \u2022 ${key}`)).join('\n')}.\n\n` +
              `These options in your package.json Jest configuration ` +
              `are not currently supported by Create React App:\n\n${unsupportedKeys
                .map((key) => chalk.bold(`  \u2022 ${key}`))
                .join('\n')}\n\nIf you wish to override other Jest options, you need to ` +
              `eject from the default setup. You can do so by running ${chalk.bold(
                'npm run eject',
              )} but remember that this is a one-way operation. ` +
              `You may also file an issue with @microfrontend-example to discuss ` +
              `supporting more options out of the box.\n`,
          ),
        );
      }

      process.exit(1);
    }
  }

  return config;
};
