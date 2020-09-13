import { Child, isChild } from '../JSX.Child';
import { Fragment, isFragment } from '../JSX.Fragment';

export type Node<P = Record<string, unknown>> =
  | Child<P>
  | Fragment
  | boolean
  | null
  | undefined;

export const isNode = <P = Record<string, unknown>>(
  value: unknown,
): value is Node<P> => {
  return (
    isChild<P>(value) ||
    isFragment(value) ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  );
};
