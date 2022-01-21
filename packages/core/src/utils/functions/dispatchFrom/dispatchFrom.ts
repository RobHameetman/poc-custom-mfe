import { dispatch } from '../dispatch';

export const dispatchFrom = (namespace: string): typeof dispatch => {
  return async <T, U = void>(type: string, detail: T | null): Promise<U> =>
    dispatch<T, U>(`${namespace}:${type}`, detail);
};
