import { Node, isNode } from '../JSX.Node';
import { Props } from '../JSX.Props';

export interface ChildrenProp {
readonly children: Node<Props<unknown>> | null;
}

export type WithChildren<P = undefined> = P extends undefined
  ? ChildrenProp
  : P & ChildrenProp;

export type PropsWithChildren<P = undefined> = Props<WithChildren<P>>;

export const isPropsWithChildren = <P = undefined>(
  value: unknown,
): value is PropsWithChildren<P> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'children' in value &&
    isNode<P>((value as Partial<PropsWithChildren<P>>).children)
  );
};
