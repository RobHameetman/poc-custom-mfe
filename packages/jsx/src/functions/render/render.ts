import { renderNode } from '../../functions';
import { Component, Props, PropsWithChildren } from '../../types';

export const render = async <P = Props>(
  Node: Component<P>,
  $mountNode: HTMLElement | null,
  props?: P,
): Promise<void> => {
  if (!$mountNode) {
    console.warn('$moundNode is null');
    return;
  }

  const propsWithChildren = {
    ...(props ? props : {}),
    children: null,
  } as PropsWithChildren<P>;

  const $vdom = await renderNode(Node(propsWithChildren), props);

  if ($vdom) {
    $mountNode.appendChild($vdom);
  }
};
