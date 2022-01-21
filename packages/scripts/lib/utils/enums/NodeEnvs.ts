export enum NodeEnvs {
  development = 'development',
  production = 'production',
  test = 'test',
}

export type NodeEnv = keyof typeof NodeEnvs;

export const isNodeEnv = (value: unknown = process.env.NODE_ENV): value is NodeEnv => {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    (isDevelopment(value) || isProduction(value) || isTest(value))
  );
};

export const NODE_ENV = isNodeEnv(process.env.NODE_ENV)
  ? process.env.NODE_ENV
  : NodeEnvs.production;

export const isDevelopment = (value: unknown = NODE_ENV): value is NodeEnvs.development => {
  return typeof value === 'string' && value === NodeEnvs.development;
};

export const isProduction = (value: unknown = NODE_ENV): value is NodeEnvs.production => {
  return typeof value === 'string' && value === NodeEnvs.production;
};

export const isTest = (value: unknown = NODE_ENV): value is NodeEnvs.test => {
  return typeof value === 'string' && value === NodeEnvs.test;
};

export const getNodeEnv = (): NodeEnv => {
  switch (NODE_ENV) {
    case NodeEnvs.development:
      return NodeEnvs.development;
    case NodeEnvs.production:
      return NodeEnvs.production;
    case NodeEnvs.test:
      return NodeEnvs.test;
    default:
      return NodeEnvs.production;
  }
};
