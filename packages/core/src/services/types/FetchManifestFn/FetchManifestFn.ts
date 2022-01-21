import { Manifest } from '../Manifest';

export type FetchManifestFn = (manifest: string) => Promise<Manifest>;
