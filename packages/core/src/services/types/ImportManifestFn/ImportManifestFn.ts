import { Manifest } from '../Manifest';

export type ImportManifestFn = (manifest: string) => Promise<Manifest>;
