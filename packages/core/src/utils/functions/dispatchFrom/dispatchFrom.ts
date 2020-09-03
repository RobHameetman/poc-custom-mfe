import { dispatch } from '../dispatch';
import { DispatchFn } from '../../types';

export const dispatchFrom = (namespace: string): DispatchFn => {
  return <T>(type: string, detail: T | null = null): void | never =>
    dispatch<T | null>(`${namespace}:${type}`, detail);
};
