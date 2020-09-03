export enum WebpackConfigFileExtensions {
  'js',
  'web.ts' = 'web.ts',
  'ts' = 'ts',
  'web.tsx' = 'web.tsx',
  'tsx' = 'tsx',
  'json' = 'json',
}

export const EXTENSIONS = Object.keys(WebpackConfigFileExtensions);
