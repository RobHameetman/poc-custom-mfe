export type LoadHook<T = object> = (props: T) => Promise<App<T>>;
export type BootHook = () => Promise<void>;
export type MountHook = () => Promise<HTMLDivElement>;
export type UnmountHook = () => Promise<void>;
export type UnloadHook = () => void;

export type AnyImportedHook = BootHook | MountHook | UnmountHook;
export type AnyHook<T = object> = LoadHook<T> | AnyImportedHook | UnloadHook;
