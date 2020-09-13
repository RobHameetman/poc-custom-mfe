import {
  Element,
  Node,
  Props,
  isElement,
  isNode,
  isScalarNode,
} from '../../types';

export const renderNode = async <P = Props, N extends Node<P> = Node<P>>(
  node: N,
  props: P | null = null,
): Promise<HTMLElement | Text | null> => {
  return new Promise(async (resolve) => {
    if (isNode(node) && node) {
      if (isScalarNode(node)) {
        return resolve(document.createTextNode(String(node)));
      }

      const type = 'type' in node ? node.type : {};
      const $element: HTMLElement | null = document.createElement(
        typeof type === 'string' ? type : 'div',
      );
      const $attrs = props !== null ? props : {};

      Object.keys($attrs).forEach(($attr) =>
        isElement($element)
          ? $element.setAttribute(
              $attr,
              String($attrs[$attr as keyof typeof $attrs]),
            )
          : void 0,
      );

      if ('props' in node) {
        if (Array.isArray(node.props.children)) {
          node.props.children.forEach(async (childNode: Node<P>) => {
            const $child = await renderNode(
              childNode,
              (childNode as Element).props || {},
            );

            if ($child && $element && 'appendChild' in $element) {
              $element.appendChild($child);
            }
          });
        } else {
          const $child = await renderNode(
            node.props.children,
            (typeof node.props.children === 'object' && 'props' in node.props.children)
              ? node.props.children.props
              : null,
          );

          if ($child && $element && 'appendChild' in $element) {
            $element.appendChild($child);
          }
        }
      }

      return resolve($element);
    } else {
      resolve(null);
    }
  });
};
