import { Element } from '../JSX.Element';
import { isKey } from '../JSX.Key';
import { Props } from '../JSX.Props';

export type WithKey<P = undefined> = P extends undefined
  ? Pick<Element, 'key'>
  : P & Pick<Element, 'key'>;

export type PropsWithKey<P = undefined> = Props<WithKey<P>>;

export const isPropsWithKey = <P = undefined>(
  value: unknown,
): value is PropsWithKey<P> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'key' in value &&
    isKey((value as Partial<PropsWithKey<P>>).key)
  );
};
