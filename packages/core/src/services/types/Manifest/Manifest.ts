// export interface Manifest extends System.Module {
//   readonly js: ReadonlyArray<string>;
//   readonly css: ReadonlyArray<string>;
//   readonly entrypoint: string;
// }

// export const isManifest = (value: unknown): value is Manifest => {
//   return (
//     typeof value === 'object' &&
//     value !== null &&
//     'js' in value &&
//     Array.isArray((value as Partial<Manifest>).js) &&
//     'css' in value &&
//     Array.isArray((value as Partial<Manifest>).css) &&
//     'entrypoint' in value &&
//     Array.isArray((value as Partial<Manifest>).entrypoint)
//   );
// };

export interface Manifest extends System.Module {
  readonly entrypoints: ReadonlyArray<string>;
  readonly files: Readonly<Record<string, string>>;
}

export const isManifest = (value: unknown): value is Manifest => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'entrypoints' in value &&
    Array.isArray((value as Partial<Manifest>).entrypoints) &&
    'files' in value &&
    typeof (value as Partial<Manifest>).files === 'object' &&
    (value as Partial<Manifest>).files !== null
  );
};
