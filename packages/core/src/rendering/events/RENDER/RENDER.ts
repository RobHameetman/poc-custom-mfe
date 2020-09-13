import { RenderingEvents } from '../../enums';
import { FC, Props } from '../../types';
import { Namespaces, AppEntrypointElement } from '../../../orchestration';
import { dispatch } from '../../../utils';

export const RENDER = `${Namespaces.Renderer}:${RenderingEvents.RENDER}`;
export type RENDER = typeof RENDER;

export interface RenderEvent<P = Props>
  extends CustomEvent<RenderEventDetail<P>> {
  type: RENDER;
}

export interface RenderEventDetail<P = Props> {
  $mountNode: AppEntrypointElement;
  App: FC<P>;
  appProps: P | null;
}

export const render = <P = Props>(
  $mountNode: AppEntrypointElement,
  App: FC<P>,
  appProps: P | null = null,
): void => {
  dispatch<RenderEventDetail<P>>(RENDER, {
    $mountNode,
    App,
    appProps,
  });
};

export const isRenderEvent = <P = Props>(
  value: unknown,
): value is RenderEvent<P> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<RenderEvent<P>>).type === RENDER
  );
};
