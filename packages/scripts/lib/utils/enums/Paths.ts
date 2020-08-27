import { realpathSync } from 'fs';
import { resolve } from 'path';
import { dir, ext } from '../functions';

const _cwd = resolve(realpathSync(process.cwd()));
const _this = resolve(`${__dirname}/../../../..`);

export const PATHS_APP_DIR = dir(_cwd);
export const PATHS_APP_BUILD_DIR = `${PATHS_APP_DIR}/dist`;
export const PATHS_APP_NODE_MODULES = `${PATHS_APP_DIR}/node_modules`;
export const PATHS_APP_PUBLIC_DIR = `${PATHS_APP_DIR}/public`;
export const PATHS_APP_SRC_DIR = `${PATHS_APP_DIR}/src`;
export const PATHS_APP_TEST_DIR = `${PATHS_APP_DIR}/test`;

export const PATHS_APP_DOTENV = `${PATHS_APP_DIR}/.env`;
export const PATHS_APP_PACKAGE_JSON = `${PATHS_APP_DIR}/package.json`;
export const PATHS_APP_TS_CONFIG = `${PATHS_APP_DIR}/tsconfig.json`;
export const PATHS_APP_INDEX_HTML = `${PATHS_APP_PUBLIC_DIR}/index.html`;
export const PATHS_APP_ENTRYPOINT = ext(`${PATHS_APP_SRC_DIR}/index`);
export const PATHS_APP_TESTS_SETUP = ext(`${PATHS_APP_TEST_DIR}/setupTests`);
export const PATHS_APP_PROXY_SETUP = `${PATHS_APP_TEST_DIR}/setupProxy.ts`;
export const PATHS_APP_TYPE_DECLARATIONS = `${PATHS_APP_SRC_DIR}/index.d.ts`;

export const PATHS_THIS_DIR = dir(_this);
export const PATHS_THIS_LIB_DIR = `${PATHS_THIS_DIR}/lib`;
export const PATHS_THIS_NODE_MODULES = `${PATHS_THIS_DIR}/node_modules`;
export const PATHS_THIS_TYPE_DECLARATIONS = `${PATHS_THIS_LIB_DIR}/index.d.ts`;

export enum Paths {
  appDir = (PATHS_APP_DIR as unknown) as Paths,
  appBuildDir = (PATHS_APP_BUILD_DIR as unknown) as Paths,
  appPublicDir = (PATHS_APP_PUBLIC_DIR as unknown) as Paths,
  appSrcDir = (PATHS_APP_SRC_DIR as unknown) as Paths,
  appTestDir = (PATHS_APP_TEST_DIR as unknown) as Paths,

  appPackageJson = (PATHS_APP_PACKAGE_JSON as unknown) as Paths,
  appTsConfig = (PATHS_APP_TS_CONFIG as unknown) as Paths,
  appNodeModules = (PATHS_APP_NODE_MODULES as unknown) as Paths,
  appIndexHtml = (PATHS_APP_INDEX_HTML as unknown) as Paths,
  appEntrypoint = (PATHS_APP_ENTRYPOINT as unknown) as Paths,
  appTestsSetup = (PATHS_APP_TESTS_SETUP as unknown) as Paths,
  appProxySetup = (PATHS_APP_PROXY_SETUP as unknown) as Paths,
  appTypeDeclarations = (PATHS_APP_TYPE_DECLARATIONS as unknown) as Paths,

  thisDir = (PATHS_THIS_DIR as unknown) as Paths,
  thisLibDir = (PATHS_THIS_LIB_DIR as unknown) as Paths,
  thisNodeModules = (PATHS_THIS_NODE_MODULES as unknown) as Paths,
  thisTypeDeclarations = (PATHS_THIS_TYPE_DECLARATIONS as unknown) as Paths,
}
