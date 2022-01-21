import { Element } from '../JSX.Element';
import { PropsWithChildren } from '../JSX.PropsWithChildren';
import { Renderable } from '../Renderable';

export interface Component<P = undefined> {
  (props: PropsWithChildren<P>): Renderable<Element<unknown>> | null;
}

export const isComponent = <P = undefined>(value: unknown): value is Component<P> => {
  return typeof value === 'function';
};
