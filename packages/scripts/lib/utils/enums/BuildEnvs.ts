export enum BuildEnvs {
  development = 'development',
  production = 'production',
  testing = 'testing',
}

export type BuildEnv = keyof typeof BuildEnvs;

export const isDevelopment = (
  value: unknown = process.env.NODE_ENV,
): value is BuildEnvs.development => {
  return typeof value === 'string' && value === BuildEnvs.development;
};

export const isProduction = (
  value: unknown = process.env.NODE_ENV,
): value is BuildEnvs.production => {
  return typeof value === 'string' && value === BuildEnvs.production;
};

export const isTesting = (value: unknown = process.env.NODE_ENV): value is BuildEnvs.testing => {
  return typeof value === 'string' && value === BuildEnvs.testing;
};

export const getBuildEnv = (): BuildEnv => {
  switch (process.env.NODE_ENV) {
    case BuildEnvs.development:
      return BuildEnvs.development;
    case BuildEnvs.production:
      return BuildEnvs.production;
    case BuildEnvs.testing:
      return BuildEnvs.testing;
    default:
      return BuildEnvs.production;
  }
};
