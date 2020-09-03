import { Service } from '../../../services';

export interface ImportedHooks {
  boot: BootHook | null;
  mount: MountHook | null;
  unmount: UnmountHook | null;
}

export type LoadHook<T = object> = (props: T) => Promise<Service<T>>;
export type BootHook = () => Promise<void>;
export type MountHook = () => Promise<HTMLDivElement>;
export type UnmountHook = () => Promise<void>;
export type UnloadHook = () => void;

export type AnyImportedHook = BootHook | MountHook | UnmountHook;
export type AnyHook<T = object> = LoadHook<T> | AnyImportedHook | UnloadHook;
