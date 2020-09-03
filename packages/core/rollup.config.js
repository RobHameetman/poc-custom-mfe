import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
/**
 * @rollup/plugin-typescript was emitting an error about
 * basically not being able to import typescript
 */
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const OUTPUT_DIR = './dist';
const DEFAULT_BUILD_FORMAT = 'ESM';
const DEFAULT_NODE_ENV = 'production';

if (!process.env.BUILD_FORMAT) {
  process.env.BUILD_FORMAT = DEFAULT_BUILD_FORMAT;
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = DEFAULT_NODE_ENV;
}

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTesting = process.env.NODE_ENV === 'testing';

const formats = {
  esm: 'esm',
  umd: 'umd',
};

const envFlags = {
  __DEVELOPMENT__: isDevelopment,
  __PRODUCTION__: isProduction,
  __TESTING__: isTesting,
};

const disableCircularDependencyWarnings = (message) => {
  if (message.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }

  console.error(message);
};

/**
 * @param {String} format One of the supported build formats
 */
const banner = (format) =>
  `/* core@${pkg.version} - ${format.toUpperCase()} - NODE_ENV:'${
    process.env.NODE_ENV
  }' */`;

const useEsm = () => process.env.BUILD_FORMAT === 'ESM';

const configureTypeScript = () => ({
  tsconfig: `./tsconfig${useEsm() ? '.esm' : ''}.json`,
});

const format = () => formats[process.env.BUILD_FORMAT.toLowerCase()];

const output = () => ({
  file: `${OUTPUT_DIR}/${format()}/core.min.js`,
  format: format(),
  name: 'core',
  sourcemap: true,
  banner: banner(format()),
});

export default {
  input: './src/index.ts',
  onwarn: disableCircularDependencyWarnings,
  output: output(),
  plugins: [
    replace(envFlags),
    json(),
    typescript(configureTypeScript()),
    commonjs(),
    resolve(),
  ],
};
