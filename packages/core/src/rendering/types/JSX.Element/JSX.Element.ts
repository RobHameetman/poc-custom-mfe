import { FC } from '../FC';
import { Key, isKey } from '../JSX.Key';
import { PropsWithChildren } from '../JSX.PropsWithChildren';

export interface Element<P = undefined> {
  type: string | FC<P>;
  props: PropsWithChildren<P>;
  key: Key | null;
}

export const isElement = <P = undefined>(
  value: unknown,
): value is Element<P> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    'props' in value &&
    'key' in value &&
    isKey((value as Partial<Element<P>>).key)
  );
};
