export type DispatchFn = <T>(type: string, detail: T) => void | never;
