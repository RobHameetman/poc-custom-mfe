export const importFrom = async <T extends System.Module = System.Module>(
  path: string,
): Promise<T> => System.import(path);
