import { RenderEvent } from './RENDER';
import { renderNode } from '../../functions';
import { Props, PropsWithChildren } from '../../types';
import { logEvent, verbose } from '../../../utils';

export const handleRender = async <P = Props>(
  e: RenderEvent<P>,
): Promise<void> => {
  logEvent(e);

  if (__DEV__) {
    verbose('handleRender()');
  }

  const { $mountNode, App, appProps = null } = e.detail;
  const propsWithKids = {
    ...(appProps ? appProps : {}),
    children: null,
  } as PropsWithChildren<P>;

  const vdom = App(propsWithKids);
  const $vdom = await renderNode(vdom, appProps);

  if ($vdom) {
    $mountNode.appendChild($vdom);
  }
};
