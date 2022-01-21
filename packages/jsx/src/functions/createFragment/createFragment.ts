import { Node, Fragment } from '../../types';

export const createFragment = (...children: ReadonlyArray<Node>): Fragment => {
  return children.length ? children : {};
};
