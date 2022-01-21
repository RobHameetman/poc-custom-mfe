import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
/**
 * @rollup/plugin-typescript was emitting an error about
 * basically not being able to import typescript
 */
import typescript from 'rollup-plugin-typescript2';

let { NODE_ENV = envs.prod } = process.env;

const pkg = require('./package.json');

const envs = {
  prod: 'production',
  dev: 'development',
  test: 'testing',
};

const formats = {
  esm: 'esm',
  system: 'system',
  umd: 'umd',
};

const DEFAULT_BUILD_FORMAT = formats.esm;
const DEFAULT_NODE_ENV = envs.prod;

if (!process.env.BUILD_FORMAT) {
  process.env.BUILD_FORMAT = DEFAULT_BUILD_FORMAT;
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = DEFAULT_NODE_ENV;
}

const DISABLED_WARNINGS = ['CIRCULAR_DEPENDENCY'];

const logEnabledWarnings = (message) => {
  const { code = '' } = message;

  if (!DISABLED_WARNINGS.includes(code)) {
    console.error(message);
  }
};

/**
 * @param {String} format One of the supported build formats
 */
const banner = (format) =>
  `/* core@${
    pkg.version
  } - ${format.toUpperCase()} - NODE_ENV:'${NODE_ENV}' */`;

const configureTypeScript = () => ({
  useTsconfigDeclarationDir: true,
  clean: true,
});

const output = (format) => ({
  file:
    NODE_ENV === envs.dev
      ? pkg.module.replace('umd', format)
      : pkg.main.replace('esm', format),
  format: format,
  name: format === formats.umd ? 'core' : undefined,
  sourcemap: true,
  banner: banner(format),
});

export default {
  input: './src/index.ts',
  onwarn: logEnabledWarnings,
  output: Object.values(formats).map(output),
  plugins: [
    json(),
    typescript(configureTypeScript()),
    commonjs(),
    resolve(),
  ],
};
