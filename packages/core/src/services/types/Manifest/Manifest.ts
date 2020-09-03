export interface Manifest {
  readonly js: ReadonlyArray<string>;
  readonly css: ReadonlyArray<string>;
  readonly entrypoint: string;
}
