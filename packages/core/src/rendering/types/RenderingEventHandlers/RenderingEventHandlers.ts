import {
  RenderEventHandler,
  SetRendererListeningEventHandler,
} from '../RenderingEventHandler';
import { RenderingEvents } from '../../enums';

export interface RenderingEventHandlers {
  [RenderingEvents.RENDER]: RenderEventHandler;
  [RenderingEvents.SET_RENDERER_LISTENING]: SetRendererListeningEventHandler;
}
