import { Element, isElement } from '../JSX.Element';
import { Text, isText } from '../JSX.Text';

export type Child<P = Record<string, unknown>> = Element<P> | Text;

export const isChild = <P = Record<string, unknown>>(
  value: unknown,
): value is Child<P> => {
  return isText(value) || isElement<P>(value);
};
