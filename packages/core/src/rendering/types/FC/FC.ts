import { Element } from '../JSX.Element';
import { PropsWithChildren } from '../JSX.PropsWithChildren';
import { Renderable } from '../Renderable';

export interface FC<P = undefined> {
  (props: PropsWithChildren<P>): Renderable<Element<unknown>> | null;
}

export const isFC = <P = undefined>(value: unknown): value is FC<P> => {
  return typeof value === 'function';
};
