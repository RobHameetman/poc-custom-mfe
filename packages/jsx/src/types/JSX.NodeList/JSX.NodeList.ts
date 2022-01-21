import { Node, isNode } from '../JSX.Node';
import { Props } from '../JSX.Props';

export type NodeList<P = Props> = ReadonlyArray<Node<P>>;

export const isNodeList = <P = Props>(value: unknown): value is NodeList<P> => {
  return (
    Array.isArray(value) && value.length > 0 && value.every((v) => isNode<P>(v))
  );
};
