export const importFrom = async <T = void>(path: string): Promise<T> =>
  System.import(path);
