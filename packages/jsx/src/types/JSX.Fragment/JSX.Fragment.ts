// import { NodeList } from '../JSX.NodeList';

// export type Fragment = {} | NodeList;
export type Fragment = {};

export const isFragment = (value: unknown): value is Fragment => {
  return typeof value === 'object' && value !== null;
};
