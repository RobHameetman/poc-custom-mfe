export enum WebpackConfigFileExtensions {
  '.js',
  '.json',
  '.jsx',
  '.ts',
  '.tsx',
}

export const EXTENSIONS = Object.keys(WebpackConfigFileExtensions).filter(
  (key) => typeof key === 'string',
);
