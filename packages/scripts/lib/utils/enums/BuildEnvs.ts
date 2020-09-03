export enum BuildEnvs {
  development = 'development',
  production = 'production',
  test = 'test',
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

export const isTest = (value: unknown = process.env.NODE_ENV): value is BuildEnvs.test => {
  return typeof value === 'string' && value === BuildEnvs.test;
};

export const getBuildEnv = (): BuildEnv => {
  switch (process.env.NODE_ENV) {
    case BuildEnvs.development:
      return BuildEnvs.development;
    case BuildEnvs.production:
      return BuildEnvs.production;
    case BuildEnvs.test:
      return BuildEnvs.test;
    default:
      return BuildEnvs.production;
  }
};
