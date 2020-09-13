import { RenderEvent, SetRendererListeningEvent } from '../../events';

export type RenderEventHandler = (e: RenderEvent) => void;
export type SetRendererListeningEventHandler = (
  e: SetRendererListeningEvent,
) => void;

export type RenderingEventHandler =
  | RenderEventHandler
  | SetRendererListeningEventHandler;
