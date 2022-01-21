import { Component, Element, Props, PropsWithChildren, PropsWithKey } from '../../types';

export const createElement = <P = Props>(
  tag: string | Component<P>,
  config: PropsWithKey<P> | null = null,
  ...children: ReadonlyArray<Element<P>>
): Element<P> => {
  let { key = null, ...props } = config ? config : {};

  props = {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };

  return {
    key,
    props: props as PropsWithChildren<P>,
    type: tag,
  };
};

window.JSX = window.JSX || createElement;
