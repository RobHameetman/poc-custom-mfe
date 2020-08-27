import { getBuildEnv } from './BuildEnvs';
import { WebpackEnv } from '../types';

export const NODE_ENV = getBuildEnv();

export const { WDS_SOCKET_HOST } = process.env;
export const { WDS_SOCKET_PATH } = process.env;
export const { WDS_SOCKET_PORT } = process.env;
export const { FAST_REFRESH } = process.env;

export enum Envs {
  NODE_ENV = (NODE_ENV as unknown) as Envs,
  PUBLIC_URL = (PUBLIC_URL as unknown) as Envs,
  WDS_SOCKET_HOST = (WDS_SOCKET_HOST as unknown) as Envs,
  WDS_SOCKET_PATH = (WDS_SOCKET_PATH as unknown) as Envs,
  WDS_SOCKET_PORT = (WDS_SOCKET_PORT as unknown) as Envs,
  FAST_REFRESH = (FAST_REFRESH as unknown) as Envs,
}

const DEFAULT_ENVS: NodeJS.ProcessEnv = {
  FAST_REFRESH,
  NODE_ENV,
  WDS_SOCKET_HOST,
  WDS_SOCKET_PATH,
  WDS_SOCKET_PORT,
};

export const env = (PUBLIC_URL: string): WebpackEnv => {
  const raw = Object.keys(process.env).reduce(
    (env, key) => ({
      ...env,
      [key]: process.env[key],
    }),
    DEFAULT_ENVS,
  );

  if (PUBLIC_URL) {
    raw.PUBLIC_URL = PUBLIC_URL;
  }

  const stringified = {
    'process.env': Object.keys(raw).reduce(
      (env, key) => ({
        ...env,
        [key]: JSON.stringify(raw[key]),
      }),
      {},
    ),
  };

  return { raw: raw as Record<string, string>, stringified };
};
